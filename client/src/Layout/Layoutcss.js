// TailwindCss used within the post is summarised here


const PostImage = ({ src, alt }) => (
    <div class="bg-gray-100 overflow-hidden rounded-lg shadow-lg relative mt-6 mb-6 h-[300px]">
        <img src={src} loading="lazy" alt={alt} class="w-full h-full object-cover object-center" />
    </div>
)

const UserImage = ({ src, alt }) => (
    <div class="bg-gray-100 overflow-hidden rounded-full shadow-lg relative mt-6 mb-6 h-[50px] w-[50px]">
        <img src={src} loading="lazy" alt={alt} class="w-full h-full object-cover object-center" />
    </div>
)

const Explain = ({ children }) => (
    <div class="text-gray-500 sm:text-base italic border-l-4 border-gray-400 pl-4 mb-6">
        { children }
    </div>
)

const Text = ({ children }) => (
    <p className="text-[#484848] my-6">
        {children}
    </p>
)

const TextTitle = ({ children }) => (
    <h2 className="text-gray-800 font-bold text-2xl mt-12 mb-2">
        {children}
    </h2>
)

const Title = ({ children }) => (
    <h1 className="text-gray-800 text-2xl font-bold my-2 py-2">
        {children}
    </h1>
)

export {PostImage, Text, Title, Explain, TextTitle, UserImage}