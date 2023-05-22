import { useEffect, useRef, useState } from "react";
import cloneDeep from "lodash.clonedeep";

// Components
import { PageLayout, Filters, Products } from "../components";

// Fixtures
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
    values: [
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
    values: [
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
    values: [
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
    values: [
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

const initialProducts = [
  {
    id: 1,
    description: " Country Style Plain Strips 35 - 55 g (4 x 1 kg)",
    code: "N3411205",
    stock: "In Stock",
    packaging: "Box",
    printed: "No",
    brand: "Meadow Vale",
  },
  {
    id: 2,
    description: " PATTIES (16.32KG X 40) DOLAV",
    code: "N1110301",
    stock: "In Stock",
    packaging: "Bag",
    printed: "Yes",
    brand: "Homestyle",
  },
  {
    id: 3,
    description: "150 g Breaded Fillet 4 x 1.05 kg ",
    code: "N3412404",
    stock: "In Stock",
    packaging: "Box",
    printed: "No",
    brand: "Meadow Vale",
  },
  {
    id: 4,
    description: "150 g Southern Fried Fillet 4 x 1.05 kg",
    code: "N3411900",
    stock: "In Stock",
    packaging: "Bag",
    printed: "Yes",
    brand: "Homestyle",
  },
  {
    id: 5,
    description: "90CL Minced Chicken Product 1000 kg",
    code: "A3102301",
    stock: "In Stock",
    packaging: "Bag",
    printed: "Yes",
    brand: "Homestyle",
  },
  {
    id: 6,
    description: "90g AMERICAN FILLETS 3.6KG",
    code: "N1411925",
    stock: "In Stock",
    packaging: "Box",
    printed: "No",
    brand: "Homestyle",
  },
  {
    id: 7,
    description: "AM FILLET 120G 3.6KG",
    code: "N1412100",
    stock: "In Stock",
    packaging: "Bag",
    printed: "Yes",
    brand: "Homestyle",
  },
  {
    id: 8,
    description: "American Ranch 2 Ultimate Chicken Fillets 20x240g",
    code: "N1412422",
    stock: "In Stock",
    packaging: "Bag",
    printed: "Yes",
    brand: "Homestyle",
  },
  {
    id: 9,
    description: "American Ranch 27 Breaded Chicken Goujons 6x1.5kg",
    code: "N1411222",
    stock: "In Stock",
    packaging: "Bag",
    printed: "Yes",
    brand: "Meadow Vale",
  },
  {
    id: 10,
    description: "AMERICAN RANCH BATT CHICK STEAKS 340Gx17",
    code: "N1470103",
    stock: "In Stock",
    packaging: "Bag",
    printed: "Yes",
    brand: "Homestyle",
  },
  {
    id: 11,
    description: "AMERICAN RANCH BREADED GOUJONS 12 X 800G",
    code: "N1411230",
    stock: "In Stock",
    packaging: "Bag",
    printed: "Yes",
    brand: "Homestyle",
  },
  {
    id: 12,
    description: "AMERICAN RANCH CHICK  NUGGETS 300G x 17",
    code: "N1470104",
    stock: "In Stock",
    packaging: "Box",
    printed: "No",
    brand: "Homestyle",
  },
  {
    id: 13,
    description: "American Ranch Chicken Brd Fillets 6 x 1.5 kg",
    code: "N1412410",
    stock: "In Stock",
    packaging: "Bag",
    printed: "Yes",
    brand: "Meadow Vale",
  },
  {
    id: 14,
    description: "AMERICAN RANCH CRISPY CHICK NUGGETS 12X500G",
    code: "N1410030",
    stock: "In Stock",
    packaging: "Box",
    printed: "No",
    brand: "Homestyle",
  },
  {
    id: 15,
    description: "American Ranch Doubles 10 x 1kg",
    code: "N1410089",
    stock: "In Stock",
    packaging: "Bag",
    printed: "Yes",
    brand: "Meadow Vale",
  },
  {
    id: 16,
    description: "American Ranch Metallica 10 x 1kg",
    code: "N1410449",
    stock: "In Stock",
    packaging: "Box",
    printed: "No",
    brand: "Homestyle",
  },
  {
    id: 17,
    description: "American Ranch Nuggets 10 x 1kg",
    code: "N1410088",
    stock: "In Stock",
    packaging: "Box",
    printed: "No",
    brand: "Meadow Vale",
  },
  {
    id: 18,
    description: "American Ranch Nuggets 12 x 480 g",
    code: "N1410085",
    stock: "In Stock",
    packaging: "Bag",
    printed: "Yes",
    brand: "Meadow Vale",
  },
  {
    id: 19,
    description: "American Ranch Patties 85g (10 x 1kg)",
    code: "N1412909",
    stock: "In Stock",
    packaging: "Box",
    printed: "No",
    brand: "Homestyle",
  },
  {
    id: 20,
    description: "American Ranch S.Fried Fillet 10x960g",
    code: "N1411924",
    stock: "In Stock",
    packaging: "Box",
    printed: "No",
    brand: "Homestyle",
  },
  {
    id: 21,
    description: "American Ranch Saver Patties 10 x 1kg",
    code: "N1412910",
    stock: "In Stock",
    packaging: "Box",
    printed: "No",
    brand: "Homestyle",
  },
  {
    id: 22,
    description: "American Ranch Spicy Nuggets 12 x 480g ",
    code: "N1415000",
    stock: "In Stock",
    packaging: "Bag",
    printed: "Yes",
    brand: "Homestyle",
  },
  {
    id: 23,
    description: "AR Double Dipper Chicken Nuggets 10x1kg ",
    code: "N1415002",
    stock: "In Stock",
    packaging: "Bag",
    printed: "Yes",
    brand: "Meadow Vale",
  },
  {
    id: 24,
    description: "B/FLY TURKEY RAW  4-6KGX4",
    code: "C1430501",
    stock: "In Stock",
    packaging: "Box",
    printed: "No",
    brand: "Meadow Vale",
  },
];

// Config
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
    const target = filter.values.find((item) => item.value == value);
    target.active = true;

    setFilters(filtersClone);
  };
  const removeFilter = (name, value) => {
    const filtersClone = cloneDeep(filters);
    const filter = filtersClone.find((item) => item.name == name);
    const target = filter.values.find((item) => item.value == value);
    target.active = false;

    setFilters(filtersClone);
  };

  async function search() {
    const query = {
      filters: filters.reduce((acc, cur) => {
        const activeValues = cur.values.filter((item) => item.active);
        acc[cur.name] =
          activeValues.length > 0
            ? activeValues.map((item) => item.value)
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
      const valuesMerged = filter.values.map((value) => {
        const updatedCount = getUpdatedCount(filter.name, value.value);
        return { ...value, count: updatedCount };
      });

      return {
        ...filter,
        values: valuesMerged,
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
    <PageLayout>
      <Filters
        filters={filters}
        addFilter={addFilter}
        removeFilter={removeFilter}
      />
      {!loading ? (
        <Products products={products} total={total} />
      ) : (
        <div>...loading</div>
      )}
    </PageLayout>
  );
};

export default ProductsPage;
