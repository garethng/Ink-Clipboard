import { BsGithub, BsTwitterX } from "react-icons/bs";

import { FaProductHunt } from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";



const Social = () => {
    return (
        <div className="mx-auto flex flex-row items-center">
            <a
                href="https://github.com/garethng/cloud_paste"
                target="_blank"
                className="mx-3 flex max-w-[24px] flex-col items-center justify-center"
            >
                <BsGithub className="text-lg w-[30px] h-[30px]" />
            </a>
            {/* <a
                href="https://www.producthunt.com/posts/ai-wallpaper?utm_source=aiwallpaper.shop"
                target="_blank"
                className="mx-3 flex max-w-[24px] flex-col items-center justify-center"
            >
                <FaProductHunt className="text-xl" />
            </a>
            <a
                href="https://twitter.com/idoubicc"
                target="_blank"
                className="mx-3 flex max-w-[24px] flex-col items-center justify-center"
            >
                <BsTwitterX className="text-lg" />
            </a>
            <a
                href="https://www.buymeacoffee.com/idoubi"
                target="_blank"
                className="mx-3 flex max-w-[24px] flex-col items-center justify-center"
            >
                <SiBuymeacoffee className="text-lg" />
            </a> */}
        </div>
    );
};

export default Social;
