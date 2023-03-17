import React from 'react';
import 'react-chat-elements/dist/main.css';
import { Avatar, Input, MessageList, MessageBox, ChatItem } from 'react-chat-elements';

import { IoMdSearch } from 'react-icons/io';

export default function Chat() {
  const messageListReferance = React.createRef();
  return (
    <div className="flex justify-center h-[100vh] bg-[#F2F2F2] ">
      <div className="container h-full max-w-[43rem] bg-[#E4E4E4] flex flex-col justify-between">
        <section className="h-[4.6rem] bg-white w-full flex flex-row  justify-between items-center px-7">
          <div className="flex flex-row">
            <Avatar
              src="https://avatars.githubusercontent.com/u/80540635?v=4"
              alt="avatar"
              size="xlarge"
              type="rounded"
            />
            <div className="ml-3">
              <h3 className="text-black font-semibold text-lg">Caroline Carvalho</h3>
              <h4 className="text-[#A8A8A8] text-xs">Processo 1234567 | Item 654321</h4>
            </div>
          </div>
          <IoMdSearch />
        </section>
        <section className="h-full">
          <div className="bg-black w-full h-full ">
            <MessageBox
              id="1"
              position="left"
              type={'photo'}
              text={'react.svg'}
              data={{
                uri: 'https://facebook.github.io/react/img/logo.svg',
                status: {
                  click: false,
                  loading: 0,
                },
              }}
            />
          </div>
        </section>
        <footer className="mb-3 mx-5">
          <Input
            maxHeight={1}
            minHeight={10}
            className="h-[3.75rem] rounded-xl"
            placeholder="Digite aqui."
            multiline={true}
            inputStyle={{ paddingLeft: 12, fontSize: 16 }}
          />
        </footer>
      </div>
    </div>
  );
}
