package com.br.astra.projetoAstra.repository;

import com.br.astra.projetoAstra.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {

    User findById(long id);

}
