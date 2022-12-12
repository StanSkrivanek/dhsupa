import type { Action } from 'svelte/action';
// our function is type of Action which takes two arguments: HTMLElement (node) and function that returns void (runFunction)
export const clickOutside: Action<HTMLElement, () => void> = (node, runFunction) => {
  const handleClick = (e: MouseEvent) => {
    // if node passed to function is NOT node we have clicked on mean we have clicked outside of it then run function passed to function as argument.
    if (node && !node.contains(e.target as HTMLElement)) {
      // if runfunction was passed to function as argument then run it
      if (runFunction) runFunction();
    }
  };
  document.addEventListener('click', handleClick, true);
  return {
    destroy: () => {
      document.removeEventListener('click', handleClick, true);
    }
  };
};

// export const clickOutside = (element: HTMLElement, callback: () => void) => {
//   const handleClick = (e: MouseEvent) => {
//     if (element && !element.contains(e.target as HTMLElement)) {
//       callback();
//     }
//   };

//   document.addEventListener('click', handleClick);
//   return () => {
//     document.removeEventListener('click', handleClick);
//   };
// };

// https://stackoverflow.com/questions/17564323/what-does-the-third-parameter-false-indicate-in-document-addeventlistenerdev
