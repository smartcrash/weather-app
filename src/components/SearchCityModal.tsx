import { FontAwesome } from "@expo/vector-icons";
import { Icon, IconButton, Input, Modal, Pressable } from "native-base";
import { useRef } from "react";

interface SearchCityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChange: (city: string) => void;
}

export default function SearchCityModal({
  isOpen,
  onClose,
  onChange,
}: SearchCityModalProps) {
  const inputValue = useRef("");

  const handleChange = () => {
    onClose();
    onChange(inputValue.current.trim());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} animationPreset={"fade"}>
      <Modal.Content>
        <Modal.Body>
          <Input
            onChangeText={(text) => (inputValue.current = text)}
            placeholder={"Enter city name"}
            size={"xl"}
            type={"text"}
            keyboardType={"web-search"}
            onSubmitEditing={handleChange}
            rightElement={
              <IconButton
                onPress={handleChange}
                icon={
                  <Icon
                    as={FontAwesome}
                    name={"search"}
                    size={"lg"}
                    color={"black"}
                  />
                }
              />
            }
          />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
