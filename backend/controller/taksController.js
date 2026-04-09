import Task from "../model/Task.js"

export const getTasks = async (req, res) => {
    try {
        const {status} = req.query

        console.log('query',req.query)
        console.log("params",status)
        let filter=  {}

        if(status){
            filter.status = status
        }

        let tasks

        if(req.user.role === 'admin'){
            tasks = await Task.find(filter).populate(
                "assignedTo",
                "name email profileImageUrl"
            )
        } else {
            tasks = await Task.find({...filter,assignedTo: req.user._id}).populate(
                "assignedTo",
                "name email profileImageUrl"
            )
        }

        tasks = await Promise.all(
            tasks.map(async(task)=>{
                const completedCount = task.todoCheckList?.filter((item)=>(
                    item.completed
                )).length
                return {...task._doc, completedTodoCount: completedCount}
            })
        )

        const allTasks = await Task.countDocuments(req.user.role === 'admin' ? {}:{assignedTo: req.user._id})

        const pendingTasks = await Task.countDocuments({
            ...filter,
            status:'Pending',
            ...(req.user.role !== 'admin' && {assignedTo: req.user._id})
        })

        const inProgressTasks = await Task.countDocuments({
            ...filter,
            status:'In Progress',
            ...(req.user.role !== 'admin' && {assignedTo: req.user._id})
        })
        const completedTasks = await Task.countDocuments({
            ...filter,
            status:'Completed',
            ...(req.user.role !== 'admin' && {assignedTo: req.user._id})
        })

        res.status(200).json({message:"Get Task success",data: {tasks, all: allTasks,pendingTasks, inProgressTasks, completedTasks}})

    } catch (error) {
        console.error("FULL ERROR:", error)
        res.status(500).json({ message: 'Error server', error })

    }
}
export const getTasksById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate(
            "assignedTo",
            "name email profileImageUrl"
        )

        if(!task) return res.status(400).json({message:'Task not found'})

        res.status(200).json({message:"Get task by Id success",data :task})
    } catch (error) {
        res.status(500).json({ message: 'Error server', error })

    }
}
export const createTask = async (req, res) => {
    try {
        const {title, description, priority, dueDate,assignedTo, attachments, todoCheckList} = req.body

        if(!Array.isArray(assignedTo)){
            return res.status(400).json({message:"assignedTo must be an array of user Id"})
        }

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            attachments,
            todoCheckList,
            createdBy: req.user._id
        })

        res.status(201).json({message:"Task created successfully",data: task})

    } catch (error) {
        res.status(500).json({ message: 'Error server', error })

    }
}
export const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)

        if(!task) return res.status(404).json({message:"Task not found"})

        task.title = req.body.title || task.title
        task.description = req.body.description || task.description
        task.priority = req.body.priority || task.priority
        task.dueDate = req.body.dueDate || task.dueDate
        task.todoCheckList = req.body.todoCheckList || task.todoCheckList
        task.attachments = req.body.attachments || task.attachments

        if(req.body.assignedTo){
            if(!Array.isArray(req.body.assignedTo)){
                return res.status(400).json({message:"assignedTo must be an array of user Id"})
            }
            task.assignedTo = req.body.assignedTo
        }

        const updateTask = await task.save()
        res.status(200).json({message:"Update task success",data : updateTask})

    } catch (error) {
        res.status(500).json({ message: 'Error server', error })

    }
}
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if(!task){
            return res.status(404).json({message:"Task not found"})
        }

        await task.deleteOne()
        res.status(200).json({message:"Delete Task success"})
    } catch (error) {
        res.status(500).json({ message: 'Error server', error })

    }
}
export const updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if(!task) return res.status(404).json({message:"Task not found"})

        const isAssigned = task.assignedTo.some((userId)=> userId.toString() === req.user._id.toString())

        if(!isAssigned && req.user.role !== 'admin'){
            return res.status(403).json({message:"Not authorized"})
        }

        task.status = req.body.status || task.status

        if(task.status === 'Completed'){
            task.todoCheckList.forEach((item)=>(item.completed = true))
            task.progress = 100
        }

        await task.save()
        res.json({message:"Task status updated",data :task})

    } catch (error) {
        res.status(500).json({ message: 'Error server', error })

    }
}
export const updateTaskChecklist = async (req, res) => {
    try {
        const {todoCheckList} = req.body

        const task = await Task.findById(req.params.id)

        if(!task) return res.status(404).json({message:"Task not found"})
        
        if(!task.assignedTo.includes(req.user._id) && req.user.role !== 'admin'){
            return res.status(403).json({message:"Not authorized to update checklist"})
        }

        task.todoCheckList = todoCheckList

        const completedCount = task.todoCheckList.filter((item)=>item.completed).length
        const totalItems = task.todoCheckList.length
        task.progress = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0

        if(task.progress === 100){
            task.status = 'Completed'
        } else if(task.progress > 0) {
            task.status = 'In Progress'
        } else{
            task.status = "Pending"
        }

        await task.save()
        const updateTask = await Task.findById(req.params.id).populate(
            "assignedTo",
            "name email profileImageUrl"
        )

        res.status(200).json({message:"Task checklist Update",data : updateTask})
    } catch (error) {
        res.status(500).json({ message: 'Error server', error })

    }
}
export const getDashboardData = async (req, res) => {
    try {
        const totalTasks = await Task.countDocuments()
        const pendingTask = await Task.countDocuments({status: 'Pending'})
        const completedTask = await Task.countDocuments({status: 'Completed'})
        const overdueTasks = await Task.countDocuments({
            status: {$ne:'Completed'},
            dueDate: {$lt: new Date()}
        })

        const taskStatuses = ["Pending","In Progress",'Completed']
        const taskDistributionRaw = await Task.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: {$sum: 1}
                }
            }
        ])
        const taskDistribution = taskStatuses.reduce((acc,status)=>{
            const formattedKey = status.replace(/\s+/g,"")
            acc[formattedKey] = taskDistributionRaw.find((item)=>item._id === status)?.count || 0
            return acc
        },{})

        taskDistribution['All'] = totalTasks

        const taskPriorities = ['Low','Medium','High']
        const taskPriorityLevelsRaw = await Task.aggregate([
            {
                $group: {
                    _id:"$priority",
                    count: {$sum:1}
                }
            }
        ])

        const taskPriorityLevels = taskPriorities.reduce((acc,priority)=>{
            acc[priority] = taskPriorityLevelsRaw.find((item)=>item._id === priority)?.count || 0
            return acc
        },{})

        const recentTasks =await Task.find().sort({createdAt: -1}).limit(10).select("title status priority dueDate createdAt")
        
        res.status(200).json({message:"Get dashboard data success",data: {totalTasks,pendingTask,completedTask,overdueTasks, charts: {taskDistribution,taskPriorityLevels}, recentTasks}})
    
    } catch (error) {
        res.status(500).json({ message: 'Error server', error })

    }
}
export const getUserDashboardData = async (req, res) => {
    try {
        const userId = req.user._id
        console.log(userId)

        const totalTasks = await Task.countDocuments({assignedTo: userId})
        const pendingTask = await Task.countDocuments({assignedTo: userId, status: 'Pending'})
        const completedTask = await Task.countDocuments({assignedTo: userId, status: 'Completed'})
        const overdueTasks = await Task.countDocuments({
            assignedTo: userId,
            status: {$ne:'Completed'},
            dueDate: {$lt: new Date()}
        })

        const taskStatuses = ["Pending","In Progress",'Completed']
        const taskDistributionRaw = await Task.aggregate([
            {
                $match: {assignedTo: userId}
            },
            {
                $group: {
                    _id: '$status',
                    count: {$sum: 1}
                }
            }
        ])

        const taskDistribution = taskStatuses.reduce((acc,status)=>{
            const formattedKey = status.replace(/\s+/g,"")
            acc[formattedKey] = taskDistributionRaw.find((item)=>item._id === status)?.count || 0
            return acc
        },{})

        taskDistribution['All'] = totalTasks

        const taskPriorities = ['Low','Medium','High']
        const taskPriorityLevelsRaw = await Task.aggregate([
            {
                $match: {assignedTo: userId}
            },
            {
                $group: {
                    _id:"$priority",
                    count: {$sum:1}
                }
            }
        ])

        const taskPriorityLevels = taskPriorities.reduce((acc,priority)=>{
            acc[priority] = taskPriorityLevelsRaw.find((item)=>item._id === priority)?.count || 0
            return acc
        },{})

        const recentTasks =await Task.find({assignedTo: userId}).sort({createdAt: -1}).limit(10).select("title status priority dueDate createdAt")
        res.status(200).json({message:"Get dashboard data success",data: {totalTasks,pendingTask,completedTask,overdueTasks, charts: {taskDistribution,taskPriorityLevels}, recentTasks}})
        
    } catch (error) {
        res.status(500).json({ message: 'Error server', error })

    }
}