import React, { useState } from 'react'

const Tasks = () => {

    const [activeTab, setActiveTab] = useState('All');
    const [task, setTask] = useState('');
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const [tasks, setTasks] = useState([
        { id: 1, task: "Imran", status: true },
        { id: 2, task: "Ali", status: false },
        { id: 3, task: "React", status: true },
    ]);
    const [filteredTasks, setFilteredTasks] = useState(tasks);

    const filterFunc = (text, tab) => {
        let filteredData = tasks;
        console.log({ filteredData });
        console.log({ text });
        if (text.trim() !== '') {
            filteredData = filteredData.filter((item) => 
                item.task.toLowerCase().includes(text.toLowerCase())
            )
        }

        if (tab === 'Active') filteredData = filteredData.filter((item) => item.status === false)
        if (tab === 'Completed') filteredData = filteredData.filter((item) => item.status === true)
        setFilteredTasks(filteredData);
        console.log({ filteredData });
    }

    const handleSearch = (text) => {
        setSearch(text);
        filterFunc(text, activeTab)
    }

    const makeDelay = (time) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(10), time)
        })
    }

    const handleAddTask = async () => {
        if (!task.trim()) return;
        setLoading(true)
        const newTask = {
            id: Date.now(),
            task: task,
            status: false
        }

        await makeDelay(1000)
        setFilteredTasks((prev) => [...prev, newTask]);
        setTask("");
        setLoading(false);
    }

    const handleTabs = (e) => {
        if (e.target.nodeName === "LI") {
            const tab = e.target.innerText;
            setActiveTab(tab)

            filterFunc(search, tab)
        }
    }

    const handleDeleted = (id) => {
        setFilteredTasks((prevTask) =>
            prevTask.filter((task) => task.id !== id)
        );
    }

    const handleToggle = (id) => {
        setFilteredTasks((prevTasks) =>
            prevTasks.map((item) => item.id === id ? { ...item, status: !item.status } : item)
        )
    }

    return (
        <div style={{ margin: 20 }}>
            <br />
            <input type="text" style={{ border: "2px solid gray", borderRadius: 5, paddingLeft: 5, marginRight: 5 }} placeholder='Enter Tasks' value={task} onChange={(e) => setTask(e.target.value)} />
            <button style={{ border: "2px solid gray", borderRadius: 5, marginLeft: 10, paddingLeft: 5, paddingRight: 5 }} disabled={loading} onClick={handleAddTask}>{loading ? "Adding..." : "Add"}</button>

            <div style={{ borderTop: '2px solid', marginTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <ul style={{ display: "flex", gap: 20 }} onClick={handleTabs}>
                        <li style={{ cursor: 'pointer', margin: 10, padding: 5, borderRadius: 5, color: activeTab === 'All' ? 'white' : 'black', background: activeTab === 'All' && 'green' }}>All</li>
                        <li style={{ cursor: 'pointer', margin: 10, padding: 5, borderRadius: 5, color: activeTab === 'Active' ? 'white' : 'black', background: activeTab === 'Active' && 'green' }}>Active</li>
                        <li style={{ cursor: 'pointer', margin: 10, padding: 5, borderRadius: 5, color: activeTab === 'Completed' ? 'white' : 'black', background: activeTab === 'Completed' && 'green' }}>Completed</li>
                    </ul>

                    <div>
                        <input style={{ borderBottom: '1px solid' }} type="search" value={search} placeholder='Search here' onChange={(e) => handleSearch(e.target.value)} />
                    </div>
                </div>
                {/* list */}
                <div style={{ borderTop: "2px solid" }}>
                    {filteredTasks.length <= 0 && <h6 style={{ color: 'red', background: '#ffd9d9', padding: 10 }}>Data is Empty</h6>}
                    {filteredTasks.map((item) => (
                        <ul key={item.id} style={{ display: "flex", gap: 20, alignItems: "center", justifyContent: 'space-between' }}>
                            <li>
                                <input onClick={() => handleToggle(item.id)} type="checkbox" checked={item.status} />
                            </li>
                            <li style={{ textDecoration: item.status === true && 'line-through' }}>{item.task}</li>
                            <li
                                style={{
                                    borderRadius: 50,
                                    border: "1px solid",
                                    paddingLeft: 7,
                                    paddingRight: 7,
                                    cursor: "pointer",
                                    margin: 5,
                                    color: 'red',
                                    background: 'rgb(255 191 191)'
                                }}
                                onClick={() => handleDeleted(item.id)}
                            >
                                X
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Tasks