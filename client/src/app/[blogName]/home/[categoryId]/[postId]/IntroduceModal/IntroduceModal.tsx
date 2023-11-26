import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { ModalContent } from "@/components/Modal/Modal.style";
import { ModalType } from "@/types/common";
import { Stack, useTheme } from "@mui/material";


function IntroduceModal({open, onClose}: ModalType) {
    const theme = useTheme();
    return(
        <Modal open={open} maxWidth="md" onClose={onClose}>
            <ModalContent>
              <Stack spacing={10} padding={'40px 80px'}>
                <Stack direction="row" width="500px" spacing={10} justifyContent="space-between">
                  <Stack direction="row" alignItems="center" spacing={4}>
                    {/* <img
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                      }}
                      src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe4%2F9a%2Ff8%2Fe49af87c36b78490745115cc14b5a80e.gif&type=ff332_332"
                      alt="profileImage"
                    /> */}
                    <Stack>
                      <Stack padding="8px">Du yeong</Stack>
                      <Stack direction="row" spacing={2}>
                        <Button size="small" variant="outlined">
                          블로그 바로가기
                        </Button>
                        <Button size="small" variant="contained">
                          친구 요청
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack>친구 200명</Stack>
                </Stack>
                <Stack width="500px" spacing={2}>
                  <Stack color="primary.main" fontSize="18px">
                    한 줄 소개
                  </Stack>
                  <Stack
                    fontSize="14px"
                    width="500px"
                    borderLeft={`1px solid ${theme.palette.primary.main}`}
                    padding={'0px 0px 0px 12px'}
                    sx={{ overflowY: 'scroll', wordBreak: 'break-all' }}
                    height="fit-content"
                    maxHeight="200px">
                    안녕
                  </Stack>
                </Stack>
              </Stack>
            </ModalContent>
      </Modal>
    )
}

export default IntroduceModal;