import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { environment } from "~~/environments/environment.dev";
import type { OrderPayload } from "~~/models/orders/orderPayload.model";
import type { Session } from "~~/models/stripe/session.model";

export const useStripeStore = defineStore('stripe', () => {
  const stripePromise = ref<Promise<Stripe> | null>();
  const baseUrl = `${environment.apiUrl}/stripe`;
  
  const {stripeCheckout} = useStripePayment<OrderPayload, Session>('post')

  onMounted(() => {
    stripePromise.value = stripeLoad();

  })

  const checkout = async(order: OrderPayload)=> {
    const stripe = await stripePromise.value;

    const checkoutUrl = `${baseUrl}/checkout`;
   
    const {data: session} = await stripeCheckout(checkoutUrl, order);


    const result = await stripe?.redirectToCheckout({
      sessionId: session?.id,
    });

    if (result?.error) {
      console.error(result.error.message);
    }

    return session;
  }

  

  const  stripeLoad = (): Promise<Stripe> =>{
    return loadStripe(environment.stripe_publishable_key!) as Promise<Stripe>;
  }

  return{
  checkout
  }
})

