const Filters = ({ filters, addFilter, removeFilter }) => {
  return (
    <div className="w-56">
      {filters.map(({ name, values }) => (
        <div key={name} className="mb-4">
          <h4 className="">{name}</h4>
          {values.map(
            ({ value, count, active }) =>
              count > 0 && (
                <label key={value} className="block py-0">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name={value}
                      id={1}
                      onChange={() => {
                        !active
                          ? addFilter(name, value)
                          : removeFilter(name, value);
                      }}
                      checked={active}
                      disabled={!active && 0 === count}
                      className="h-3 w-3 rounded border-2 border-text bg-transparent text-primary focus:ring-primary focus:ring-offset-0 checked:focus:ring-text disabled:opacity-30"
                    />
                    <div className="">
                      {value}
                      <span className="text-gray-500 text-xs ml-2">{`(${count})`}</span>
                    </div>
                  </div>
                </label>
              )
          )}
        </div>
      ))}
    </div>
  );
};

export default Filters;
