import { useState } from "react";
function useToggle(initialVal = false) {
  const [state, setState] = useState(initialVal);
  const toggle = () => {
    setState(prevState=>!prevState);
  };
  return [state, toggle];
}
export default useToggle;
