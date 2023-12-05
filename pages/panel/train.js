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
                    Modal Title
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Magna exercitation reprehenderit magna aute tempor
                      cupidatat consequat elit dolor adipisicing. Mollit dolor
                      eiusmod sunt ex incididunt cillum quis. Velit duis sit
                      officia eiusmod Lorem aliqua enim laboris do dolor
                      eiusmod. Et mollit incididunt nisi consectetur esse
                      laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                      deserunt nostrud ad veniam.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
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
