// 테마
export type ThemeType = 'light' | 'dark';

// Modal Type
export type ModalType = {
  open: boolean;
  onClose: () => void;
};

// Private 버튼 Map Type
type ColorType = 'oppositeColor' | 'primary';
type VariantType = 'text' | 'contained';

export type PrivateMapType = {
  publicButton: {
    private: {
      color: ColorType;
      variant: VariantType;
    };
    public: {
      color: ColorType;
      variant: VariantType;
    };
  };
  privateButton: {
    private: {
      color: ColorType;
      variant: VariantType;
    };
    public: {
      color: ColorType;
      variant: VariantType;
    };
  };
};
