import Image from 'next/image';

const CustomImage = (p: any) => {
    return (
        <div className='flex justify-center'>
            <div className='rounded-md overflow-hidden'>
                <Image src={p.value.url} alt={p.alt} width={450} height={450} />
            </div>
        </div>
    );
}

export default CustomImage;