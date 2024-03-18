import SearchIconUrl from "@/assets/common/search.svg";
import { ChangeEvent, ComponentProps, LegacyRef, forwardRef, useMemo } from "react";



interface Iprop extends ComponentProps<any> {
    placeholder?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function SearchFieldFn(
    { placeholder, ...otherProps }: Iprop,
    ref: LegacyRef<HTMLInputElement>
) {
    // generate random id
    const uid: number = useMemo(() => {
        return Math.floor(Math.random() * 10000);
    }, []);

    return (
        <div className="relative md:block flex-grow">
            <img src={SearchIconUrl} className="absolute end-4 top-2.5" />
            <input
                id={`search-input-field-${uid}`}
                className=" bg-gray-50 lg:w-96 w-full	 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                placeholder={placeholder}
                ref={ref}
                {...otherProps}
            />
        </div>

    );
}

const SearchField = forwardRef<HTMLInputElement, Iprop>(SearchFieldFn);
export default SearchField;

