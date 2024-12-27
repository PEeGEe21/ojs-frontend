import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure
  } from '@chakra-ui/react'

function ArticleSummaryDrawer({ isOpen, onClose, currentArticle, summary=null }) {
  
    return (
      <>
        <Drawer onClose={onClose} isOpen={isOpen} size={'lg'}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{`${currentArticle?.title}`}</DrawerHeader>
            <DrawerBody>
            <div>
                <h4 className='mb-3 underline underline-offset-1 font-semibold'>Summary</h4>
              </div>
              <p>
                {summary}
              </p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  export default ArticleSummaryDrawer;