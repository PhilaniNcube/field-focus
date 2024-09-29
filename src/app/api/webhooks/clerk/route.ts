import {Webhook} from 'svix';
import  {headers} from 'next/headers'
import {revalidatePath} from 'next/cache'
import { WebhookEvent } from '@clerk/nextjs/server';


import { fetchMutation } from "convex/nextjs";
import { api } from '../../../../../convex/_generated/api';


export async function POST(req:Request) {

  const WEBHOOK_SECRET = process.env.CLERK_SIGNING_SECRECT;

  if(!WEBHOOK_SECRET){
    throw new Error('No webhook secret found')
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_signature = headerPayload.get('svix-signature');
  const svix_timestamp = headerPayload.get('svix-timestamp');

  if(!svix_id || !svix_signature || !svix_timestamp){
    return new Response('Missing headers', {status: 400})
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {

    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;

  } catch (err) {
    console.error('Error verifying webhook', err);
    return new Response('Error verifying webhook', {status: 400});
  }

  const eventType = evt.type;

  if(eventType === 'user.created'){
    const {id, email_addresses, first_name, last_name} = evt.data;

    if(!id || !email_addresses || !first_name || !last_name){
      return new Response('Missing data', {status: 400});
    }

    const email = email_addresses[0].email_address;

    const user = {
      clerk_id: id,
      email,
      first_name,
      last_name,
    }

    const newDbUser = await fetchMutation(api.users.createUser, user);

    revalidatePath('/dashboard', "layout")
    revalidatePath('/profile', "layout")

    if(!newDbUser){
      return new Response('Error creating user', {status: 500});
    }

    return new Response('User created', {status: 200});

  }

  return new Response('Unhandled event', {status: 200});


}
