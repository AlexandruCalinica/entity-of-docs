/** @jsxImportSource react */
import type { FunctionComponent, ChangeEventHandler } from "react";

import "./VersionSelect.css";

const options = ["v1", "v2"];

const VersionSelect: FunctionComponent = () => {
  const defaultOption = (() => {
    const subdomain = window.location.host.split(".")[0];
    switch (subdomain) {
      case "v1":
        return "v1";
      case "www":
        return "v2";
      default:
        return "v2";
    }
  })();

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    switch (e.target.value) {
      case "v1":
        window.location.href = "https://v1.entity-of.xyz";
        break;
      case "v2":
        window.location.href = "https://www.entity-of.xyz";
        break;
      default:
        break;
    }
  };

  return (
    <div className="version-select-wrapper">
      <select
        className="version-select"
        onChange={handleChange}
        defaultValue={defaultOption}
      >
        {options.map((option) => {
          return (
            <option value={option} key={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default VersionSelect;
