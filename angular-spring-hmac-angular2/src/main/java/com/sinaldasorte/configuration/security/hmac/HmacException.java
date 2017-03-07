package com.sinaldasorte.configuration.security.hmac;

/**
 * Hmac signer exception
 * Created by Michael DESIGAUD on 16/02/2016.
 */
public class HmacException extends Exception{

	private static final long serialVersionUID = -3091144650405107916L;

	public HmacException(String message) {
        super(message);
    }

    public HmacException(String message, Throwable throwable) {
        super(message,throwable);
    }
}
