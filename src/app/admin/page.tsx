'use client';
import axiosInstance from "@/axiosInstance";
import { useUpload } from "@/hooks/hooks";
import { Question, User } from "@/types/types";
import { Autocomplete, AutocompleteItem, Button, Card, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AiFillBook, AiFillPlusCircle } from "react-icons/ai";

export default function Page() {
    const [logined, setLogined] = useState(false);
    
    if (!logined) {
        return <AdminLogin setLogined={setLogined} />
    }

    return <div className="flex w-full min-h-screen items-center flex-col justify-center gap-3">
        <h1 className="text-3xl font-bold">Admin actions</h1>
        <AddBookAction />
        <TransferBookAction />
        <UnattachBookAction />
    </div>
}

function AddTestAction() {
    const [testData, setTestData] = useState({
        name: '',
        questions: []
    });
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const postNewBook = async () => {
        try {
            await axiosInstance.post('/tests', testData);
            setTestData({
                name: '',
                questions: []
            })
        } catch (error) {
            console.log(error);
            alert('An error occurred');
        }
    }

    return <>
    <Card className="md:w-1/6 bg-primary text-background" isPressable isBlurred onPress={onOpen}>
        <CardHeader className="flex justify-between">
            <div className="flex gap-3 items-center">
                <AiFillBook />
                <p>Add new book</p>
            </div>
            <AiFillPlusCircle />
        </CardHeader>
    </Card>
    <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
    >
        <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add new book</ModalHeader>
            <ModalBody>
                <Input
                    isRequired
                    type="text"
                    label="Title"
                    variant="bordered"
                    onChange={(e) => setTestData({ ...testData, name: e.target.value })}
                    value={testData.name}
                    className="max-w-xs"
                />
                <Input
                    isRequired
                    type="text"
                    label="Author"
                    variant="bordered"
                    onChange={(e) => setTestData({ ...testData, author: e.target.value })}
                    value={bookData.author}
                    className="max-w-xs"
                />
                <Textarea
                    isRequired
                    label="Description"
                    variant="bordered"
                    onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
                    value={bookData.description}
                    className="max-w-xs"
                />
                <Input 
                    labelPlacement="inside"
                    label="Preview image"
                    type="file"
                    variant="bordered"
                    color="primary"
                    onChange={handlePreview}
                />
                <Input 
                    labelPlacement="inside"
                    label="PDF File"
                    type="file"
                    variant="bordered"
                    color="primary"
                    onChange={handleBook}
                />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={() => {
                postNewBook();
                onClose();
              }}>
                Add
              </Button>
            </ModalFooter>
          </>
        )}
        </ModalContent>
    </Modal>
    </>
}

function AddQuestionAction() {
    const [books, setBooks] = useState<Question[]>([]); 
    const [users, setUsers] = useState<User[]>([]); 

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const createQuestion = async () => {
        try {
            await axiosInstance.post(`/books/${bookID}/transfer`, { userID });
        } catch (error) {
            console.log(error);
            alert('An error occurred');
        }
    }

    return <>
    <Card className="md:w-1/6 bg-primary text-background" isPressable isBlurred onPress={onOpen}>
        <CardHeader className="flex justify-between">
            <div className="flex gap-3 items-center">
                <AiFillBook />
                <p>Bind book</p>
            </div>
            <AiFillPlusCircle />
        </CardHeader>
    </Card>
    <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
    >
        <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add new book</ModalHeader>
            <ModalBody>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={() => {
                onClose();
              }}>
                Add
              </Button>
            </ModalFooter>
          </>
        )}
        </ModalContent>
    </Modal>
</>
}

function UnattachBookAction() {
    const [books, setBooks] = useState<Book[]>([]); 

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [bookID, setBookID] = useState('');

    useEffect(() => {
        const getBooks = async () => {
            try {
                const books = await axiosInstance.get('/books');
                setBooks(books.data);
            } catch (error) {
                console.log(error);
                alert('An error occurred');
            }
        }
        getBooks();
    }, []);

    const transferBook = async () => {
        console.log(bookID);
        try {
            await axiosInstance.delete(`/books/${bookID}/transfer`);
        } catch (error) {
            console.log(error);
            alert('An error occurred');
        }
    }

    return <>
    <Card className="md:w-1/6 bg-primary text-background" isPressable isBlurred onPress={onOpen}>
        <CardHeader className="flex justify-between">
            <div className="flex gap-3 items-center">
                <AiFillBook />
                <p>Unbind book</p>
            </div>
            <AiFillPlusCircle />
        </CardHeader>
    </Card>
    <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
    >
        <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add new book</ModalHeader>
            <ModalBody>
                <Autocomplete
                    label="Book"
                    selectedKey={bookID}
                    onSelectionChange={(e) => setBookID(e!.toString())}
                >
                    {books.map((book) => (
                        <AutocompleteItem key={book.id}>
                            {book.title}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={() => {
                transferBook();
                onClose();
              }}>
                Add
              </Button>
            </ModalFooter>
          </>
        )}
        </ModalContent>
    </Modal>
</>
}

function AdminLogin({ setLogined }: { setLogined: (logined: boolean) => void }) {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const postLogin = async () => {
        try {
            const response = await axiosInstance.post('/auth/admin_login', loginData);
            if (response.data.ok) {
                setLogined(true);
            }
        } catch (error) {
            console.log(error);
            alert('An error occurred');
        }
    }

    return <div className='min-h-screen flex items-center justify-center'>
    <Card className="rounded-lg px-8 py-5 gap-4 md:w-1/3">
        <CardHeader className="font-bold text-large">Admin Panel</CardHeader>
        <Input
            isRequired
            type="email"
            label="Email"
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            value={loginData.email}
            className="max-w-xs"
        />
        <Input
            isRequired
            type="password"
            label="Password"
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            value={loginData.password}
            className="max-w-xs"
        />

        <Button color="primary" onClick={postLogin}>Login</Button>
    </Card>
</div>
}