import { Children, cloneElement, isValidElement, useRef } from "react";

export default function AccessibleTabs({ label, value, onChange, children, className = "" }) {
  const tabs = Children.toArray(children).filter(isValidElement);
  const refs = useRef([]);

  const select = (index) => {
    const tab = tabs[index];
    if (!tab) return;
    onChange(tab.props.value);
    requestAnimationFrame(() => refs.current[index]?.focus());
  };

  const onKeyDown = (event, index) => {
    let next = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next === null) return;
    event.preventDefault();
    select(next);
  };

  return (
    <div role="tablist" aria-label={label} className={className}>
      {tabs.map((tab, index) => cloneElement(tab, {
        ref: (element) => { refs.current[index] = element; },
        role: "tab",
        id: `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-tab-${tab.props.value}`,
        "aria-selected": value === tab.props.value,
        tabIndex: value === tab.props.value ? 0 : -1,
        onClick: (event) => {
          tab.props.onClick?.(event);
          onChange(tab.props.value);
        },
        onKeyDown: (event) => onKeyDown(event, index),
      }))}
    </div>
  );
}