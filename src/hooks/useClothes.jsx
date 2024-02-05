import { useQuery } from "react-query";

const useClothes = () => {
    const { data: clothes = [], isLoading: loading, refetch } = useQuery(['clothes'], async () => {
        const res = await fetch(`http://localhost:5000/clothes`);
        return res.json();
    });

    return [clothes, loading, refetch];
};

export default useClothes;
