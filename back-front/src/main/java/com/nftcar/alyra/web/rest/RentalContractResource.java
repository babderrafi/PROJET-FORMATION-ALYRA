package com.nftcar.alyra.web.rest;

import com.nftcar.alyra.repository.RentalContractRepository;
import com.nftcar.alyra.service.RentalContractService;
import com.nftcar.alyra.service.dto.RentalContractDTO;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.nftcar.alyra.domain.RentalContract}.
 */
@RestController
@RequestMapping("/api")
public class RentalContractResource {

    private final Logger log = LoggerFactory.getLogger(RentalContractResource.class);

    private static final String ENTITY_NAME = "rentalContract";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RentalContractService rentalContractService;

    private final RentalContractRepository rentalContractRepository;

    public RentalContractResource(RentalContractService rentalContractService, RentalContractRepository rentalContractRepository) {
        this.rentalContractService = rentalContractService;
        this.rentalContractRepository = rentalContractRepository;
    }

    /**
     * {@code POST  /rental-contracts} : Create a new rentalContract.
     *
     * @param rentalContractDTO the rentalContractDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rentalContractDTO, or with status {@code 400 (Bad Request)} if the rentalContract has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/rental-contracts")
    public ResponseEntity<RentalContractDTO> createRentalContract(@Valid @RequestBody RentalContractDTO rentalContractDTO)
        throws URISyntaxException {
        log.debug("REST request to save RentalContract : {}", rentalContractDTO);
        if (rentalContractDTO.getId() != null) {
            throw new BadRequestAlertException("A new rentalContract cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RentalContractDTO result = rentalContractService.save(rentalContractDTO);
        return ResponseEntity
            .created(new URI("/api/rental-contracts/" + result.getId()))
            .headers(createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }


    public static HttpHeaders createEntityCreationAlert(String applicationName, boolean enableTranslation, String entityName, String param) {
        String message = enableTranslation
            ? applicationName + "." + entityName + ".created"
            : "Un contrat  a été créé avec l'identifiant " + param;
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
     * {@code PUT  /rental-contracts/:id} : Updates an existing rentalContract.
     *
     * @param id the id of the rentalContractDTO to save.
     * @param rentalContractDTO the rentalContractDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rentalContractDTO,
     * or with status {@code 400 (Bad Request)} if the rentalContractDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rentalContractDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/rental-contracts/{id}")
    public ResponseEntity<RentalContractDTO> updateRentalContract(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody RentalContractDTO rentalContractDTO
    ) throws URISyntaxException {
        log.debug("REST request to update RentalContract : {}, {}", id, rentalContractDTO);
        if (rentalContractDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, rentalContractDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!rentalContractRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        RentalContractDTO result = rentalContractService.save(rentalContractDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, rentalContractDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /rental-contracts/:id} : Partial updates given fields of an existing rentalContract, field will ignore if it is null
     *
     * @param id the id of the rentalContractDTO to save.
     * @param rentalContractDTO the rentalContractDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rentalContractDTO,
     * or with status {@code 400 (Bad Request)} if the rentalContractDTO is not valid,
     * or with status {@code 404 (Not Found)} if the rentalContractDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the rentalContractDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/rental-contracts/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<RentalContractDTO> partialUpdateRentalContract(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody RentalContractDTO rentalContractDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update RentalContract partially : {}, {}", id, rentalContractDTO);
        if (rentalContractDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, rentalContractDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!rentalContractRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<RentalContractDTO> result = rentalContractService.partialUpdate(rentalContractDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, rentalContractDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /rental-contracts} : get all the rentalContracts.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rentalContracts in body.
     */
    @GetMapping("/rental-contracts")
    public ResponseEntity<List<RentalContractDTO>> getAllRentalContracts(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of RentalContracts");
        Page<RentalContractDTO> page = rentalContractService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /rental-contracts/:id} : get the "id" rentalContract.
     *
     * @param id the id of the rentalContractDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rentalContractDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/rental-contracts/{id}")
    public ResponseEntity<RentalContractDTO> getRentalContract(@PathVariable Long id) {
        log.debug("REST request to get RentalContract : {}", id);
        Optional<RentalContractDTO> rentalContractDTO = rentalContractService.findOne(id);
        return ResponseUtil.wrapOrNotFound(rentalContractDTO);
    }

    /**
     * {@code DELETE  /rental-contracts/:id} : delete the "id" rentalContract.
     *
     * @param id the id of the rentalContractDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/rental-contracts/{id}")
    public ResponseEntity<Void> deleteRentalContract(@PathVariable Long id) {
        log.debug("REST request to delete RentalContract : {}", id);
        rentalContractService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
