import { useAccount } from "wagmi";
import CitizenListPage from "../RepositoriesListPage/CitizenListPage";
import NoConnection from "@/shared/components/NoConnection/NoConnection";

function HomePage() {
    const { isConnected } = useAccount();

    return (

        <div className={"h-full w-full bg-white p-8 flex flex-col"}>
            {isConnected ? (
                <CitizenListPage />
            ) : (
                <NoConnection />

            )}

        </div>
    );
}

export default HomePage;
