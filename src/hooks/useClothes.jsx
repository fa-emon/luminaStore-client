import { useQuery } from "react-query";

const useClothes = () => {
    const { data: clothes = [], isLoading: loading, refetch } = useQuery(['clothes'], async () => {
        const res = await fetch(`https://lumina-store-server.vercel.app/clothes`);
        return res.json();
    });

    return [clothes, loading, refetch];
};

export default useClothes;
