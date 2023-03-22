package pl.geonavigator.backend.domain.encoder;

import com.password4j.Password;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PasswordEncoderImpl implements PasswordEncoder {

    @Value("value")
    private String pepper;

    @Override
    public String encode(String text) {
        return Password
                .hash(text)
                .addPepper(pepper)
                .withBcrypt()
                .getResult();
    }

    @Override
    public boolean check(String text, String hashed) {
        return Password
                .check(text, hashed)
                .addPepper(pepper)
                .withBcrypt();
    }
}
