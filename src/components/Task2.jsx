import { useState } from "react"
import MyPie from "./Pie"
import { AiOutlineDelete } from "react-icons/ai";
import animatedDelete from '../assets/gif/icons8-delete.gif'

const delay = (ms = 1000) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(10)
        }, ms)
    })
}

const Task2 = () => {
    const [tasks, setTasks] = useState([
        { id: 1, task: "Imran", status: 'pending' },
        { id: 2, task: "Ali", status: 'in progress' },
        { id: 3, task: "React", status: 'completed' },
    ]);
    const [pieData, setPieData] = useState([
        {
            "id": "pending",
            "label": "Pending",
            "value": tasks.filter((t) => t.status === 'pending').length,
            "color": "hsl(106, 70%, 50%)"
        },
        {
            "id": "inprogress",
            "label": "In Progress",
            "value": tasks.filter((t) => t.status === 'in progress').length,
            "color": "hsl(136, 70%, 50%)"
        },
        {
            "id": "completed",
            "label": "Completed",
            "value": tasks.filter((t) => t.status === 'completed').length,
            "color": "hsl(295, 70%, 50%)"
        }
    ])
    const [newTask, setNewTask] = useState('');
    const [loadingState, setLoadingState] = useState([]);

    // add new task
    const handleNewTask = () => {
        const newT = { id: Date.now(), task: newTask, status: 'pending' }
        if (newTask.trim() === "") return;
        setTasks((prevTasks) => [...prevTasks, newT]);
        setNewTask("");
        setPieData((prev) =>
            prev.map((p) =>
                p.id === 'pending' ? { ...p, value: p.value + 1 } : p
            )
        );
    }

    // handle delete
    const handleDelete = async (id) => {
        setLoadingState((prev) => [...prev, { id, status: true }]);
        await delay(1000);
        setTasks((prevTask) => prevTask.filter((t) => t.id !== id))
        setLoadingState((prev) => prev.filter((item) => item.id !== id));
    }
// handle checkbox
const handleCheckbox = (id, status) => {
  console.log({ id, status });

  setTasks((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, status } : item
    )
  );
};


    return (
        <div className='flex flex-row items-center w-4/5 m-auto p-5 gap-5 bg-purple-50 h-screen'>
            <div className='flex flex-col w-4/5 m-auto items-center p-5 gap-5'>
                <div className='bg-purple-500 flex flex-col items-center p-0 rounded-full shadow-lg'>
                    <h1 className='text-2xl mt-2 text-shadow-lg'>Tasks Management</h1>
                    <div className='bg-purple-200 w-4/5 my-5 rounded-full p-5 flex flex-row items-center shadow-lg'>
                        <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} className='border-2 border-purple-500 px-2 w-full rounded-tl-full rounded-bl-full' placeholder='Enter Tasks' />
                        <button onClick={handleNewTask} className='px-2 bg-purple-500 border-2 border-purple-500 w-1/4 rounded-tr-full rounded-br-full'>Add</button>
                    </div>
                </div>

                {/* table */}
                <div className="w-full">
                    <div className="py-2 flex justify-between">
                        <ul className="flex gap-2 cursor-pointer">
                            <li className="hover:bg-purple-200 bg-purple-300 border border-purple-500 rounded px-2">All</li>
                            <li className="hover:bg-purple-200 rounded px-2 border border-purple-500">Pending</li>
                            <li className="hover:bg-purple-200 rounded px-2 border border-purple-500">In Progress</li>
                            <li className="hover:bg-purple-200 rounded px-2 border border-purple-500">Completed</li>
                        </ul>
                        <input type="text" className="border-b-1 rounded px-2" placeholder="Search here" />
                    </div>
                    <div className="overflow-auto max-h-100">
                        <table className="w-full text-center border-collapse shadow-md rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-purple-300 text-purple-900">
                                    <th className="p-3"></th>
                                    <th className="p-3">#</th>
                                    <th className="p-3">Task</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.sort((a, b) => b.id - a.id).map((task, index) => {
                                    const isLoading = loadingState.some((item) => item.id === task.id);
                                    console.log({ isLoading });
                                    return (
                                        <tr key={task.id} className="bg-purple-100">
                                            <td className="p-3"><input type="checkbox" onChange={() => handleCheckbox(task.id, task.status)} /></td>
                                            <td className="p-3">{index + 1}</td>
                                            <td className="p-3">{task.task}</td>
                                            <td className="p-3">{task.status}</td>
                                            <td className="p-3">
                                                <button className="bg-red-200 text-red-500 p-2 rounded-full hover:bg-red-400 hover:text-white transition" onClick={() => handleDelete(task.id)}>
                                                    {isLoading ? <img className="rounded-full w-6" src={animatedDelete} alt="Loading" /> : <AiOutlineDelete />}
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {tasks.length <= 0 && <div className="text-red-500 bg-red-200 w-full">No more data!</div>}
                    </div>
                    <div className="py-2 flex justify-between">
                        <ul className="flex gap-2">
                            <li className="bg-purple-300 rounded-full px-2">1</li>
                            <li className="bg-purple-300 rounded-full px-2">2</li>
                            <li className="bg-purple-300 rounded-full px-2">3</li>
                            <li className="bg-purple-300 rounded-full px-2">4</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* pie chart */}
            <div className="w-100 h-100">
                <MyPie data={pieData} />
            </div>
        </div>
    )
}

export default Task2