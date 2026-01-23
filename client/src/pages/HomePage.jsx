import LoadingSpinner from "../components/LoadingSpinner";
import { useProducts } from "../hooks/useProducts";

const HomePage = () => {
    const {data: products, isLoading, error} = useProducts();

    if(isLoading) return <LoadingSpinner />;

    if(error) {
        return (
            <div role="alert" className="alert alert-error">
                <span>Error loading products: {error.message}.Please try again later.</span>
            </div>
        )
    }

    return <div>Home</div>
};

export default HomePage;