// Helpers
import { classNames } from "../helpers";

const Container = ({ children, className }) => {
  return (
    <div
      className={classNames(
        "mx-auto  max-w-6xl px-4 sm:px-6 lg:px-8 min-w-[360px]",
        className ? className : ""
      )}
    >
      {children}
    </div>
  );
};

export default Container;
