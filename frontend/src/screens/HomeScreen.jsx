import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'

function HomeScreen() {
  const { data: products, isLoading, error, isError } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader/>
      ) : isError ? (
        <Message variant="red">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <div className="mt-20 mx-6 md:mt-24">
          <h1 className="font-bold text-xl font-sans text-slate-700">
            Latest Products
          </h1>
          <div className="mt-6 xs:flex flex-wrap justify-center">
            {products.map((product, index) => (
              <Product product={product} key={index} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default HomeScreen