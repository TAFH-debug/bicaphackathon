'use client';
import axiosInstance from "@/axiosInstance";
import { QuestionCreate } from "@/types/types";
import { Button, Card, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { AiFillBook, AiFillPlusCircle } from "react-icons/ai";


type TestCreate = {
    name: string, 
    questions: QuestionCreate[],
    difficulty: number,
    category: string,
}

export default function Page() {
    const [logined, setLogined] = useState(false);
    
    if (!logined) {
        return <AdminLogin setLogined={setLogined} />
    }

    return <div className="flex w-full min-h-screen items-center flex-col justify-center gap-3">
        <h1 className="text-3xl font-bold">Admin actions</h1>
        <AddTestAction />
    </div>
}

function AddTestAction() {
    const [testData, setTestData] = useState<TestCreate>({
        name: '',
        questions: [],
        difficulty: 0,
        category: '',
    });
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const postNewBook = async () => {
        try {
            await axiosInstance.post('/tests', testData);
            setTestData({
                name: '',
                questions: [],
                difficulty: 0,
                category: '',
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
                <p>Add new test</p>
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
                    label="Name"
                    variant="bordered"
                    onChange={(e) => setTestData({ ...testData, name: e.target.value })}
                    value={testData.name}
                    className="max-w-xs"
                />
                <Input
                    isRequired
                    type="number"
                    label="Difficulty"
                    variant="bordered"
                    onChange={(e) => setTestData({ ...testData, difficulty: +e.target.value })}
                    value={''+testData.difficulty}
                    className="max-w-xs"
                />
                <Input
                    isRequired
                    type="text"
                    label="Category"
                    variant="bordered"
                    onChange={(e) => setTestData({ ...testData, category: e.target.value })}
                    value={testData.category}
                    className="max-w-xs"
                />
                {
                    testData.questions.map((question, index) => <div key={index} className="flex items-center gap-2">
                        <p className="text-black">{question.text}</p>
                        <Button color="danger" variant="light" onPress={() => setTestData({ ...testData, questions: testData.questions.filter((_, i) => i !== index) })}>
                            Remove
                        </Button>
                    </div>)
                }
                <AddQuestionAction addQuestion={(q: QuestionCreate) => setTestData({...testData, questions: [...testData.questions, q]})}/>
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

function AddQuestionAction({ addQuestion }: { addQuestion: (questions: QuestionCreate) => void }) {

    const [questionData, setQuestionData] = useState<QuestionCreate>({
        text: '',
        options: [],
        right: 0
    });
    const [cur, setCur] = useState('');

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return <>
    <Card className="bg-primary text-background" isPressable isBlurred onPress={onOpen}>
        <CardHeader className="flex justify-between">
            <div className="flex gap-3 items-center">
                <AiFillBook />
                <p>Add Question</p>
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
                    label="Text"
                    variant="bordered"
                    onChange={(e) => setQuestionData({ ...questionData, text: e.target.value })}
                    value={questionData.text}
                    className="max-w-xs"
                />
                <Input
                    isRequired
                    type="number"
                    label="Right"
                    variant="bordered"
                    onChange={(e) => setQuestionData({ ...questionData, right: +(e.target.value) })}
                    value={''+questionData.right}
                    className="max-w-xs"
                />
                {
                    questionData.options.map((option, index) => <div key={index} className="flex items-center gap-2">
                        <p className="text-black">{option}</p>
                        <Button color="danger" variant="light" onPress={() => setQuestionData({ ...questionData, options: questionData.options.filter((_, i) => i !== index) })}>
                            Remove
                        </Button>
                    </div>)
                }
                <div className="flex items-center gap-2">
                    <Input
                        isRequired
                        type="text"
                        label="Option"
                        variant="bordered"
                        onChange={(e) => setCur(e.target.value)}
                        value={cur}
                        className="max-w-xs"
                    />
                    <Button variant="light" onPress={() => {
                        setQuestionData({ ...questionData, options: [...questionData.options, cur] });
                        setCur('');
                    }}>
                        AddOption
                    </Button>
                </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={() => {
                addQuestion(questionData);
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