import { Popover, Transition } from '@headlessui/react';
import {
    LocalizationProvider,
    MultiSectionDigitalClock,
    type MultiSectionDigitalClockProps,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Fragment, memo, type PropsWithChildren } from 'react';

import { classNames } from '@/helpers/classNames.js';

interface TimePickerProps extends PropsWithChildren<MultiSectionDigitalClockProps<dayjs.Dayjs>> {
    className?: string;
    containerClassName?: string;
    panelClassName?: string;
}

export const TimePicker = memo<TimePickerProps>(function TimePicker({
    className,
    containerClassName,
    panelClassName,
    children,
    ...props
}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Popover as="div" className={classNames('relative', containerClassName)}>
                {({ close }) => (
                    <>
                        <Popover.Button className="w-full">
                            <span className={className}>{children}</span>
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                static
                                className={classNames(
                                    'absolute bottom-full left-0 z-50 flex flex-col gap-2 rounded-lg bg-lightBottom shadow-popover dark:border dark:border-line dark:bg-darkBottom dark:shadow-none',
                                    panelClassName,
                                )}
                            >
                                <MultiSectionDigitalClock
                                    {...props}
                                    classes={{ root: 'custom-time-picker' }}
                                    onChange={(...args) => {
                                        close();
                                        props.onChange?.(...args);
                                    }}
                                />
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </LocalizationProvider>
    );
});
