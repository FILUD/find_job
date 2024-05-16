import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'


interface errorProps {
    isOpen: boolean
    isClose: () => void
    title: string
    message: string
    theme: string
}
function Success_popup({ message, title, isOpen, isClose , theme}: errorProps) {
    return (
        <html>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={isClose}>
                    {/* Dialog background */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/75" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className='w-fit max-w-fit card w-200 bg-base-300 shadow-xl transition-all' data-theme={theme}>
                                    {/* Close button */}
                                    <button className="btn btn-square btn-sm absolute top-0 right-0 m-3 " onClick={isClose}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                    {/* Dialog title */}
                                    <Dialog.Title as="h3" className="card-title self-center mt-5 text-2xl flex-col">
                                        <h2 className='font-bold'>View </h2>
                                    </Dialog.Title>
                                    <div className=''>

                                    </div>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div >
                    </div >
                </Dialog >
            </Transition >
        </html >
    )
}

export default Success_popup