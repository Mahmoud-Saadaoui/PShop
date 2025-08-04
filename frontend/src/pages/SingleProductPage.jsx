import SingleProductReviews from "../components/singleProduct/SingleProductReviews";
import { useParams } from "react-router-dom";
import { useGetProductById } from "../lib/queries/productsQueries";
import SingleProductSkeleton from "../components/loaders/SingleProductSkeleton";
import SingleProductImages from "../components/singleProduct/SingleProductImages";
import SingleProductDetails from "../components/singleProduct/SingleProductDetails";

const SingleProductPage = () => {
  const { id } = useParams();
  const { data: product, isPending, isError, error } = useGetProductById(id);

  if (isPending) return <SingleProductSkeleton />;
  if (isError)
    return (
      <Alert
        message={error.message || "Fetching The Product Is Failed"}
        type="error"
      />
    );
  return (
    <>
      <section className="container mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-800 items-stretch">
        <SingleProductImages images={product?.images} />
        <SingleProductDetails product={product} />
      </section>
      <SingleProductReviews reviews={product.reviews} />
    </>
  );
};

export default SingleProductPage;
