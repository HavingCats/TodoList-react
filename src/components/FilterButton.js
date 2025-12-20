import React from "react";

function FilterButton(props) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
         /* const [filter, setFilter] = useState("All");这里设置为All,所以默认是按下的 */
       /*这里的 aria-pressed 告诉辅助技术（比如屏幕阅读器），该按钮可以有两种状态。
        按压 或 未按压 。可以把它们看作 开 和 关 。
        设置为 true 意味着该按钮默认是被按下的。*/
      onClick={() => props.setFilter(props.name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;
