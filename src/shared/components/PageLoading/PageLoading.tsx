import Lottie from "lottie-react";
import LoadingAnimation from "@/assets/lottieFiles/LoadingAnimation.json";

interface Iprop {
    className?: string;
}

function PageLoading({ className = "" }: Iprop) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20">
            <Lottie
                className={`h-[150px] w-[150px] ${className}`}
                loop
                autoPlay
                animationData={LoadingAnimation}
            />
        </div>
    );
}

export default PageLoading;
