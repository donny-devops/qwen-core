import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Plus, Check, Trash2, ListTodo } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  pomodorosEstimated?: number;
  pomodorosCompleted?: number;
}

export function TaskList() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('pomodoro-tasks', []);
  const [newTask, setNewTask] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  const addTask = () => {
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      text: newTask.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      pomodorosEstimated: 1,
      pomodorosCompleted: 0,
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const incrementPomodoro = (id: string) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, pomodorosCompleted: (t.pomodorosCompleted || 0) + 1 } : t
    ));
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="w-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5">
      <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4 flex items-center gap-2">
        <ListTodo size={14} />
        Tasks
      </h3>

      {/* Add task input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add a task..."
          className="flex-1 px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
        />
        <button
          onClick={addTask}
          className="p-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 transition-all"
          aria-label="Add task"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Active tasks */}
      {activeTasks.length > 0 ? (
        <div className="space-y-2 mb-3">
          {activeTasks.map(task => (
            <div
              key={task.id}
              className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all"
            >
              <button
                onClick={() => toggleTask(task.id)}
                className="flex-shrink-0 w-5 h-5 rounded-md border-2 border-white/30 hover:border-purple-400 transition-colors"
                aria-label="Mark complete"
              />
              <span className="flex-1 text-sm text-white/80">{task.text}</span>
              {task.pomodorosCompleted !== undefined && task.pomodorosEstimated !== undefined && (
                <span className="text-xs text-white/40 font-mono">
                  {task.pomodorosCompleted}/{task.pomodorosEstimated}🍅
                </span>
              )}
              <button
                onClick={() => incrementPomodoro(task.id)}
                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/10 text-white/40 hover:text-white transition-all"
                aria-label="Add pomodoro"
                title="Mark pomodoro completed"
              >
                🍅
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-all"
                aria-label="Delete task"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-white/30 text-center py-4">No tasks yet. Add one above!</p>
      )}

      {/* Completed tasks toggle */}
      {completedTasks.length > 0 && (
        <div>
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="text-xs text-white/40 hover:text-white/60 transition-colors mb-2"
          >
            {showCompleted ? 'Hide' : 'Show'} completed ({completedTasks.length})
          </button>
          
          {showCompleted && (
            <div className="space-y-2">
              {completedTasks.map(task => (
                <div
                  key={task.id}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5 group"
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="flex-shrink-0 w-5 h-5 rounded-md bg-purple-500/30 border-2 border-purple-400 flex items-center justify-center"
                    aria-label="Mark incomplete"
                  >
                    <Check size={12} className="text-purple-300" />
                  </button>
                  <span className="flex-1 text-sm text-white/40 line-through">{task.text}</span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-all"
                    aria-label="Delete task"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
