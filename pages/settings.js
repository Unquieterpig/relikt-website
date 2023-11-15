import GradientTop from '@components/GamesenseGradient';
import Metatags from '@components/Metatags';

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";


export default function SettingsPage() {
    return (
        
        <>
            <Metatags
            title="bigpoo"
            description="Settings of website"
            />
            <settingsContainer />
        </>
    );
}

function settingsContainer() {
    return (
    <>
        <App />
        <div className="flex justify-center items-center gap-2 decoration-stone-400">
            <deleteAccount />
        </div>
    </>
    );
}

function App() {
    return (
    <>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Settings</p>
          <small className="text-default-500">More Below</small>
          <h4 className="font-bold text-large">Delete Account</h4>
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
    </>
    );
}

  

function deleteAccount() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
        <>
            <div className="flex flex-col items-center text-center gap-2">
                <button classname="" onPress={onOpen}>Delete Your Account ;P</button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                            <ModalHeader classname="flex justify-around gap-1 flex-col">Are you sure about that?</ModalHeader>
                            <ModalBody>
                                <p classname="text-center">
                                Woah woah there buddy, don't go jumping the gun just yet.
                                Are you really sure that you want to delete your account?
                                Indefinitely?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button classname="text-center bg-teal-300" onPress={onClose}>
                                    YES PLZ
                                </Button>
                                <button classname="text-center bg-red-300" onPress={onClose}>
                                    NO PLZ
                                </button>

                            </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </>
    );
}

function updateSubscribtion() {
    return (
        <>
        
        </>
    );
}

function header() {
    return (
    <>
            <GradientTop />
    </>
    );
}

function areYouSurePopup() {
    return (
    <>
        <div>
            
        </div>
    </>
    );
}

