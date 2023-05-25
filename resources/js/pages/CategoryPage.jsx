import { useEffect, useRef, useState } from "react";
import cloneDeep from "lodash.clonedeep";

// Components
import { Filters, Heading, Layout, Products } from "../components";

// Config
const page = {
  title: "Our Products",
  intro:
    "From our famous battered chicken nuggets to our recently launched and fastest growing product, Salt & Chilli Shredded Chicken, you can be confident every product in our range has been developed specifically to meet the needs of the food service sector",
};

const exampleQuery = {
  filters: {
    brand: ["Meadow Vale", "Homestyle"],
    packaging: ["Box", "Bag"],
    printed: ["Yes", "No"],
    Stock: ["Out of Stock"],
  },
  from: 0,
  size: 24,
  sort: null,
};

const initialFilters = [
  {
    name: "Brand",
    options: [
      {
        value: "Meadow Vale",
        count: 309,
        active: false,
      },
      {
        value: "Homestyle",
        count: 330,
        active: false,
      },
    ],
  },
  {
    name: "Packaging",
    options: [
      {
        value: "Bag",
        count: 317,
        active: false,
      },
      {
        value: "Box",
        count: 322,
        active: false,
      },
    ],
  },
  {
    name: "Printed",
    options: [
      {
        value: "Yes",
        count: 317,
        active: false,
      },
      {
        value: "No",
        count: 322,
        active: false,
      },
    ],
  },
  {
    name: "Stock",
    options: [
      {
        value: "In Stock",
        count: 639,
        active: false,
      },
      {
        value: "Out of Stock",
        count: 0,
        active: false,
      },
    ],
  },
];

const API_URL = "http://localhost:8000/api";

const ProductsPage = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);
  const onlySync = useRef(false);

  const addFilter = (name, value) => {
    const filtersClone = cloneDeep(filters);
    const filter = filtersClone.find((item) => item.name == name);
    const target = filter.options.find((item) => item.value == value);
    target.active = true;

    setFilters(filtersClone);
  };
  const removeFilter = (name, value) => {
    const filtersClone = cloneDeep(filters);
    const filter = filtersClone.find((item) => item.name == name);
    const target = filter.options.find((item) => item.value == value);
    target.active = false;

    setFilters(filtersClone);
  };

  const getActiveFilters = () => {
    const activeFilters = filters.reduce((acc, cur) => {
      const filterName = cur.name;
      const activeOptions = cur.options.filter(
        (option) => option.active && option.count > 0
      );

      for (option of activeOptions) {
        acc.push({ name: filterName, value: option.value });
      }

      return acc;
    }, []);
    return getActiveFilters;
  };

  async function search() {
    const query = {
      filters: filters.reduce((acc, cur) => {
        const activeOptions = cur.options.filter((option) => option.active);
        acc[cur.name] =
          activeOptions.length > 0
            ? activeOptions.map((option) => option.value)
            : null;
        return acc;
      }, {}),
      from: 0,
      size: 24,
      sort: null,
    };

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      });

      const result = await response.json();
      handleResponse(result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleResponse = (result) => {
    setProducts(Object.values(result.hits));
    setTotal(result.count);
    mergeFilters(result.filters);
  };

  const mergeFilters = (updatedFilters) => {
    const getUpdatedCount = (name, value) => {
      const filter = updatedFilters.find(
        (filter) => filter.filter == name && filter.value == value
      );
      return filter?.count || 0;
    };

    const filtersMerged = filters.map((filter) => {
      const optionsMerged = filter.options.map((option) => {
        const updatedCount = getUpdatedCount(filter.name, option.value);
        return { ...option, count: updatedCount };
      });

      return {
        ...filter,
        options: optionsMerged,
      };
    });

    onlySync.current = true;
    setFilters(filtersMerged);
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      // return here if statically loading initial products
      // return;
    }
    if (onlySync.current) {
      onlySync.current = false;
      return;
    }

    search();
  }, [filters]);

  return (
    <Layout>
      <Heading page={page} />
      <Filters
        filters={filters}
        addFilter={addFilter}
        removeFilter={removeFilter}
      />
      <Products products={products} total={total} loading={loading} />
    </Layout>
  );
};

export default ProductsPage;
