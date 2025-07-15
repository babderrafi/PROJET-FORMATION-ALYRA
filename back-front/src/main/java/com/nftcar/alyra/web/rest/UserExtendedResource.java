package com.nftcar.alyra.web.rest;

import com.nftcar.alyra.repository.UserExtendedRepository;
import com.nftcar.alyra.service.UserExtendedService;
import com.nftcar.alyra.service.dto.UserExtendedDTO;
import com.nftcar.alyra.web.rest.errors.BadRequestAlertException;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.nftcar.alyra.domain.UserExtended}.
 */
@RestController
@RequestMapping("/api")
public class UserExtendedResource {

    private final Logger log = LoggerFactory.getLogger(UserExtendedResource.class);

    private static final String ENTITY_NAME = "userExtended";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserExtendedService userExtendedService;

    private final UserExtendedRepository userExtendedRepository;

    public UserExtendedResource(UserExtendedService userExtendedService, UserExtendedRepository userExtendedRepository) {
        this.userExtendedService = userExtendedService;
        this.userExtendedRepository = userExtendedRepository;
    }

    /**
     * {@code POST  /user-extendeds} : Create a new userExtended.
     *
     * @param userExtendedDTO the userExtendedDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userExtendedDTO, or with status {@code 400 (Bad Request)} if the userExtended has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-extendeds")
    public ResponseEntity<UserExtendedDTO> createUserExtended(@Valid @RequestBody UserExtendedDTO userExtendedDTO)
        throws URISyntaxException {
        log.debug("REST request to save UserExtended : {}", userExtendedDTO);
        if (userExtendedDTO.getId() != null) {
            throw new BadRequestAlertException("A new userExtended cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserExtendedDTO result = userExtendedService.save(userExtendedDTO);
        return ResponseEntity
            .created(new URI("/api/user-extendeds/" + result.getId()))
            .headers(createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
    public static HttpHeaders createEntityCreationAlert(String applicationName, boolean enableTranslation, String entityName, String param) {
        String message = enableTranslation
            ? applicationName + "." + entityName + ".created"
            : "Un acteur  a été créé avec l'identifiant " + param;
        return createAlert(applicationName, message, param);
    }
    public static HttpHeaders createAlert(String applicationName, String message, String param) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-" + applicationName + "-alert", message);
        try {
            headers.add("X-" + applicationName + "-params", URLEncoder.encode(param, StandardCharsets.UTF_8.toString()));
        } catch (UnsupportedEncodingException e) {
        }
        return headers;
    }

    /**
     * {@code PUT  /user-extendeds/:id} : Updates an existing userExtended.
     *
     * @param id the id of the userExtendedDTO to save.
     * @param userExtendedDTO the userExtendedDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userExtendedDTO,
     * or with status {@code 400 (Bad Request)} if the userExtendedDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userExtendedDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-extendeds/{id}")
    public ResponseEntity<UserExtendedDTO> updateUserExtended(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody UserExtendedDTO userExtendedDTO
    ) throws URISyntaxException {
        log.debug("REST request to update UserExtended : {}, {}", id, userExtendedDTO);
        if (userExtendedDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userExtendedDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userExtendedRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        UserExtendedDTO result = userExtendedService.save(userExtendedDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, userExtendedDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /user-extendeds/:id} : Partial updates given fields of an existing userExtended, field will ignore if it is null
     *
     * @param id the id of the userExtendedDTO to save.
     * @param userExtendedDTO the userExtendedDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userExtendedDTO,
     * or with status {@code 400 (Bad Request)} if the userExtendedDTO is not valid,
     * or with status {@code 404 (Not Found)} if the userExtendedDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the userExtendedDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/user-extendeds/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<UserExtendedDTO> partialUpdateUserExtended(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody UserExtendedDTO userExtendedDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update UserExtended partially : {}, {}", id, userExtendedDTO);
        if (userExtendedDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userExtendedDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userExtendedRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<UserExtendedDTO> result = userExtendedService.partialUpdate(userExtendedDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, userExtendedDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /user-extendeds} : get all the userExtendeds.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userExtendeds in body.
     */
    @GetMapping("/user-extendeds")
    public List<UserExtendedDTO> getAllUserExtendeds() {
        log.debug("REST request to get all UserExtendeds");
        return userExtendedService.findAll();
    }

    /**
     * {@code GET  /user-extendeds/:id} : get the "id" userExtended.
     *
     * @param id the id of the userExtendedDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userExtendedDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-extendeds/{id}")
    public ResponseEntity<UserExtendedDTO> getUserExtended(@PathVariable Long id) {
        log.debug("REST request to get UserExtended : {}", id);
        Optional<UserExtendedDTO> userExtendedDTO = userExtendedService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userExtendedDTO);
    }

    /**
     * {@code DELETE  /user-extendeds/:id} : delete the "id" userExtended.
     *
     * @param id the id of the userExtendedDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-extendeds/{id}")
    public ResponseEntity<Void> deleteUserExtended(@PathVariable Long id) {
        log.debug("REST request to delete UserExtended : {}", id);
        userExtendedService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
