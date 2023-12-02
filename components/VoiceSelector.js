function VoiceSelector() {
    const [selectedKeys, setSelectedKeys] = useState(new Set(["Martin Russel"]));
  
    const selectedValue = useMemo(
      () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
      [selectedKeys]
    );
  
    return (
      <div className="ring-1 ring-gray-400/10 my-4">
        <Dropdown id="voiceSelection">
          <DropdownTrigger>
            <Button variant="bordered" className="my-2">
              {selectedValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={(event) => setSelectedKeys(event)}
          >
            {/* Possibly create function to generate dropdownitems from a list of all voices */}
            <DropdownItem key="Martin Russel">Martin Russel</DropdownItem>
            <DropdownItem key="Moist Critikal">Moist Critikal</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }