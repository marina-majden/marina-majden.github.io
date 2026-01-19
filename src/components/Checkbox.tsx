import React from "react";

interface CheckboxProps {
    t: {
        contact: {
            agree: string;
        };
    };
}

const Checkbox = ({ t }: CheckboxProps) => {
    return (
        <label
            htmlFor='hr'
            className='flex flex-row items-center gap-2.5 font-light text-sm text-left text-gray-300'>
            <input id='hr' type='checkbox' className='peer hidden' />
            <div className='h-4 w-4 flex rounded-xs border border-dynamic-cyan bg-gray-900 peer-checked:bg-[#9052f3] transition-colors duration-200'>
                <div className='h-3 w-3 m-auto rounded-full peer-checked:bg-[#9052f3] '></div>
            </div>
            {t.contact.agree}
        </label>
    );
};

export default Checkbox;
