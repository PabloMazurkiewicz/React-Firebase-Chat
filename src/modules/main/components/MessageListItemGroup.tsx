import React, { FunctionComponent } from 'react';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';
import { Avatar, Box } from '@material-ui/core';
import MessageListItem from './MessageListItem';
import User from '../interfaces/User';

interface MessageListItemGroupProps {
  user: User;
  messages: Data[];
}

const MessageListItemGroup: FunctionComponent<MessageListItemGroupProps> = ({
  user,
  messages,
}: MessageListItemGroupProps) => {
  const belongsToUser = user.uid === messages[0].userData.uid;

  return (
    <Box
      my={0.5}
      mx={1}
      textAlign={belongsToUser ? 'right' : 'left'}
      display='flex'
    >
      {!belongsToUser && (
        <Box mr={1}>
          <Box height='calc(100% - 40px)' />
          <Box position='sticky' bottom='0' pb={0.4}>
            <Avatar
              alt='Remy Sharp'
              style={{ backgroundColor: messages[0].userData.color }}
            >
              {messages[0].userData.name[0]}
            </Avatar>
          </Box>
        </Box>
      )}
      <Box flexGrow='1'>
        {messages &&
          messages.map((item: Data, index: number) => (
            <MessageListItem
              message={item}
              user={user}
              key={messages[index].id}
              showName={index === 0}
              showTail={messages.length - 1 === index}
            />
          ))}
      </Box>
    </Box>
  );
};

export default MessageListItemGroup;
