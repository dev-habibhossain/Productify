import { ArrowLeftIcon, EditIcon, Trash2Icon, CalendarIcon, UserIcon } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import CommentSection from "../components/CommentSection";
import { useAuth } from "@clerk/clerk-react";
import { useProduct, useDeleteProduct } from "../hooks/useProducts";
import { useParams, Link, useNavigate } from "react-router";

const ProductPage = () => {
    const {id} =useParams();
    const { userId } = useAuth();
    const navigate = useNavigate();

    const { data: product, isLoading, error } = useProduct(id);
    
    return (
        <div>
            product page
        </div>
    );
};

export default ProductPage;