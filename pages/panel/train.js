import {
  Breadcrumbs,
  BreadcrumbItem,
  Card,
  CardBody,
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Metatags from "@components/Metatags";
import { SearchIcon } from "@components/SearchIcon";
import TrainFeed from "@components/TrainFeed";
import GradientTop from "@components/GamesenseGradient";

export default function Train() {
  return (
    <>
      <Metatags title="Relikt - Train" description="Train an AI voice" />
      <GradientTop />

      <TrainContainer />
    </>
  );
}

//Container to put everything in
function TrainContainer() {
  return (
    <>
      <TrainBreadcrumb />
      <div className="mx-10 mt-5">
        <TrainFeed />
      </div>
    </>
  );
}

function TrainBreadcrumb() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Card className="mx-10 mt-5">
      <CardBody className="flex flex-row justify-between">
        <Breadcrumbs size="lg" className="flex text-center justify-center font">
          <BreadcrumbItem href="/panel">Panel</BreadcrumbItem>
          <BreadcrumbItem href="/panel/train">Train</BreadcrumbItem>
        </Breadcrumbs>

        <div className="flex flex-row gap-1">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />

          <Button color="primary" onPress={onOpen}>
            + Train Model
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Train a Voice
                  </ModalHeader>
                  <ModalBody className="flex flex-col justify-center items-center text-center">
                    <h1 className="font-bold text-4xl">
                      Training a voice is currently disabled during the beta
                      period.
                    </h1>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Train
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </CardBody>
    </Card>
  );
}

// On click of train button, open a modal with a form to fill out
// Form should have:
// - Name of model
// - Description of model
// - Upload audio files
// - Submit button
// - Cancel button
// -
// On submit, send data to firestore
// - Name of model
// - Description of model
// - Upload audio files
// - Submit button
// - Cancel button

// A list of previously trained models
