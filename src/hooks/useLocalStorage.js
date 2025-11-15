import { useState, useEffect } from "react";


export default function useLocalStorage(key, initial) {
const [state, setState] = useState(() => {
const saved = localStorage.getItem(key);
return saved ? JSON.parse(saved) : initial;
});


useEffect(() => {
localStorage.setItem(key, JSON.stringify(state));
}, [key, state]);


return [state, setState];
}