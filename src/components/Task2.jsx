import { useEffect, useMemo, useRef, useState } from "react"
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
    const masterCheckboxRef = useRef();
    const [tasks, setTasks] = useState([
        { id: 1, task: "Imran", status: true },
        { id: 2, task: "Ali", status: true },
        { id: 3, task: "React", status: false },
    ]);

    const pieData = useMemo(() => {
        return [
            {
                "id": "active",
                "label": "Active",
                "value": tasks.filter((t) => t.status === true).length,
                "color": "hsl(106, 70%, 50%)"
            },
            {
                "id": "completed",
                "label": "Completed",
                "value": tasks.filter((t) => t.status === false).length,
                "color": "hsl(295, 70%, 50%)"
            }
        ]
    }, [tasks])

    const [newTask, setNewTask] = useState('');
    const [loadingState, setLoadingState] = useState([]);
    const [activeTab, setActiveTab] = useState('All');
    const [searchInput, setSearchInput] = useState('');

    // add new task
    const handleNewTask = () => {
        const newT = { id: Date.now(), task: newTask, status: true }
        if (newTask.trim() === "") return;
        setTasks((prevTasks) => [...prevTasks, newT]);
        setNewTask("");
    }

    // handle delete
    const handleDelete = async (id) => {
        setLoadingState((prev) => [...prev, { id, status: true }]);
        await delay(1000);
        setTasks((prevTask) => prevTask.filter((t) => t.id !== id))
        setLoadingState((prev) => prev.filter((item) => item.id !== id));
    }
    // handle checkbox
    const handleCheckbox = (id) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, status: !t.status } : t
            )
        );
    };

    const handleMasterCheckbox = (e) => {
        const checked = e.target.checked;
        setTasks((prev) => prev.map((t) => ({ ...t, status: !checked })));
    };

    const allChecked = tasks.every(t => t.status === false);
    const someChecked = tasks.some(t => t.status === false);

    useEffect(() => {
        if (masterCheckboxRef.current) {
            masterCheckboxRef.current.indeterminate = !allChecked && someChecked
        }
    }, [someChecked, allChecked])

    const filteredTasks = useMemo(() => {
        let data = [...tasks];

        if (searchInput.trim() !== '')
            data = data.filter(t => t.task.toLowerCase().includes(searchInput.toLowerCase()));

        if (activeTab === 'Active') data = data.filter(t => t.status === true);
        if (activeTab === 'Completed') data = data.filter(t => t.status === false);

        return data;
    }, [activeTab, tasks, searchInput])

    const handleTabs = (e) => {
        if (e.target.tagName === 'LI') {
            setActiveTab(e.target.innerText);
        }
    }

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center w-full max-w-7xl mx-auto p-5 gap-5 bg-purple-50 min-h-screen">

            {/* left: tasks */}
            <div className="flex flex-col w-full md:w-2/3 items-center p-5 gap-5">
                <div className="bg-purple-500 flex flex-col items-center px-5 md:px-0 rounded-full shadow-lg w-full">
                    <h1 className="text-2xl mt-2">Tasks Management</h1>
                    <div className="bg-purple-200 w-full md:w-4/5 my-5 rounded-full p-2 flex flex-row items-center shadow-lg">
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            className="border-2 border-purple-500 px-2 w-full rounded-tl-full rounded-bl-full"
                            placeholder="Enter Tasks"
                        />
                        <button
                            onClick={handleNewTask}
                            className="px-2 bg-purple-500 border-2 border-purple-500 w-1/3 md:w-1/4 rounded-tr-full rounded-br-full"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* table */}
                <div className="w-full">
                    <div className="py-2 flex flex-col md:flex-row justify-between gap-3">
                        <ul className="flex flex-wrap gap-2 cursor-pointer" onClick={handleTabs}>
                            <li className={`hover:bg-purple-200 rounded px-2 border border-purple-500 ${activeTab === 'All' && 'bg-purple-300'}`}>All</li>
                            <li className={`hover:bg-purple-200 rounded px-2 border border-purple-500 ${activeTab === 'Active' && 'bg-purple-300'}`}>Active</li>
                            <li className={`hover:bg-purple-200 rounded px-2 border border-purple-500 ${activeTab === 'Completed' && 'bg-purple-300'}`}>Completed</li>
                        </ul>
                        <input
                            type="search"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="border rounded px-2 w-full md:w-1/3"
                            placeholder="Search here"
                        />
                    </div>

                    <div className="overflow-x-auto max-h-[500px]">
                        <table className="w-full text-center border-collapse shadow-md rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-purple-300 text-purple-900">
                                    <th className="p-3"><input type="checkbox" ref={masterCheckboxRef} checked={allChecked} onChange={(e) => handleMasterCheckbox(e)} /></th>
                                    <th className="p-3">#</th>
                                    <th className="p-3">Task</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTasks.sort((a, b) => b.id - a.id).map((task, index) => {
                                    const isLoading = loadingState.some((item) => item.id === task.id);
                                    return (
                                        <tr key={task.id} className="bg-purple-100">
                                            <td className="p-3"><input type="checkbox" checked={!task.status} onChange={() => handleCheckbox(task.id)} /></td>
                                            <td className="p-3">{index + 1}</td>
                                            <td className={`p-3 ${!task.status ? "line-through text-gray-400" : ""}`}>{task.task}</td>
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
                        {filteredTasks.length <= 0 && <div className="text-red-500 bg-red-200 w-full">No more data!</div>}
                    </div>
                    {/* <div className="py-2 flex justify-between">
                        <ul className="flex gap-2">
                            <li className="bg-purple-300 rounded-full px-2">1</li>
                            <li className="bg-purple-300 rounded-full px-2">2</li>
                            <li className="bg-purple-300 rounded-full px-2">3</li>
                            <li className="bg-purple-300 rounded-full px-2">4</li>
                        </ul>
                    </div> */}
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