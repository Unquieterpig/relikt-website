import GradientTop from '@components/GamesenseGradient';
import Metatags from '@components/Metatags';

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Card, CardHeader, CardBody, Image, Link} from "@nextui-org/react";



export default function SettingsPage() {
    return (<>
        <Metatags
        title="Relikt Website - Settings"
        description="Settings of website"
        />
        <SettingsPageHolder />
        </>);
}

function SettingsPageHolder() {
    return (<>
        <App1 />
        <App2 />
        {/* <div className="flex justify-center items-center gap-2 decoration-stone-400">
        <App1 />
        <App2 />
        </div> */}
    </>);
}

function App1() {
    return (<>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p>Settings</p>
          <small className="text-default-500">Account Deactivation</small>
          <p>Please don't leave so soon!<br /><DeleteAccount /></p>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="/images/hero-card-complete.jpeg"
            width={270}
          />
        </CardBody>
      </Card>
    </>);
}

function App2() {
    return (<>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p></p>
          <small className="text-default-500">Manage Subscriptions:</small>
          <p>Us Developers could use a bone<br /><Subscriptions /></p>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="/images/hero-card-complete.jpeg"
            width={270}
          />
        </CardBody>
      </Card>
    </>);
}


  

function DeleteAccount() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    
    return (<>

        
        <Button classname="bg-slate-400" onPress={onOpen}>Delete Your Account ;P</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                    <>
                        <ModalHeader classname="flex justify-around gap-1 flex-col">Are you sure about that?</ModalHeader>
                        <ModalBody>
                            Woah woah there buddy, don't go jumping the gun just yet.
                            Are you really sure that you want to delete your account?
                            Indefinitely?
                        </ModalBody>
                        <ModalFooter>
                            <Button onPress={onClose}>
                            <a onPress={onClose} class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
                            <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
                            <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                            <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                            <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">YES PLZ VERSION 1</span>
                            </a>
                            </Button>
                            <Button classname="text-center decoration-gray-400" onPress={onClose}>
                                YES PLZ VERSION 2
                            </Button>
                            <Button classname="text-center decoration-gray-100" onPress={onClose}>
                                NO PLZ
                            </Button>

                        </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>);
}

function Subscriptions() {
    return (<>
        <Link href="http://localhost:3000/#pricing" classname="text-center items-center">
            View Your Subscriptions
        </Link>
        </>);
}

function header() {
    return (<>
            <GradientTop />
    </>);
}

