import { type Dispatch, type SetStateAction, useCallback } from 'react';

import CloseIcon from '@/assets/close.svg';
import GalleryIcon from '@/assets/gallery.svg';
import Editor from '@/components/compose/Editor.js';
import type { IImage } from '@/components/compose/index.js';
import { Image } from '@/esm/Image.js';
import { classNames } from '@/helpers/classNames.js';

interface ComposeContentProps {
    type: 'compose' | 'quote' | 'reply';
    setCharacters: (characters: string) => void;
    images: File[];
    setImages: Dispatch<SetStateAction<IImage[]>>;
}
export default function ComposeContent({ type, setCharacters, images, setImages }: ComposeContentProps) {
    const createImageUrl = (file: File) => URL.createObjectURL(file);

    const removeImage = useCallback(
        (index: number) => {
            setImages((_images) => {
                const newImages = [..._images];
                newImages.splice(index, 1);
                return newImages;
            });
        },
        [setImages],
    );

    const createImageItem = useCallback(
        (image: File, index: number) => (
            <>
                <Image src={createImageUrl(image)} alt={image.name} fill className=" object-cover" />
                <CloseIcon
                    className=" absolute right-2 top-2 h-[18px] w-[18px] cursor-pointer"
                    width={18}
                    height={18}
                    onClick={() => removeImage(index)}
                />
            </>
        ),
        [removeImage],
    );

    return (
        <div className=" p-4">
            <label
                className={classNames(
                    ' hide-scrollbar block h-[338px] overflow-auto rounded-lg border border-[#E7E7E7] px-4 py-[14px]',
                    type === 'compose' ? 'bg-[#F7F7F7]' : 'bg-white',
                )}
            >
                <div className=" flex min-h-full flex-col justify-between">
                    <Editor type={type} setCharacters={setCharacters} hasImages={images.length > 0} />

                    {/* quote */}
                    {(type === 'quote' || type === 'reply') && (
                        <div className=" gap-1 rounded-2xl border border-[#ACB4C1] bg-[#F9F9F9] p-3">
                            <div className=" flex h-6 items-center justify-between">
                                <div className=" flex items-center gap-2">
                                    <GalleryIcon width={24} height={24} />
                                    <span className=" text-sm font-medium text-[#07101B]">Judd</span>
                                    <span className=" text-sm text-[#767F8D]">@judd</span>
                                </div>
                                <div className=" flex items-center gap-2">
                                    <GalleryIcon width={16} height={16} />
                                    <span className=" text-xs font-medium text-[#767F8D]">1h</span>
                                </div>
                            </div>

                            <div className=" flex gap-4">
                                <p className=" text-left">123</p>
                                <GalleryIcon
                                    className=" h-[120px] w-[120px] rounded-lg object-cover"
                                    width={120}
                                    height={120}
                                />
                            </div>
                        </div>
                    )}

                    {/* image */}
                    {images.length > 0 && (
                        <div className=" relative grid grid-cols-2 gap-2 p-3">
                            {images.map((image, index) => {
                                const len = images.length;

                                return (
                                    <div
                                        key={image.name + index}
                                        className={classNames(
                                            ' overflow-hidden rounded-2xl',
                                            len <= 2 ? ' h-72' : len === 3 && index === 2 ? ' h-72' : ' h-[138px]',
                                            len === 1 ? ' col-span-2' : '',
                                            len === 3 && index === 1 ? ' col-start-1' : '',
                                            len === 3 && index === 2
                                                ? ' absolute right-3 top-3 w-[251px]'
                                                : ' relative',
                                        )}
                                    >
                                        {createImageItem(image, index)}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </label>
        </div>
    );
}
