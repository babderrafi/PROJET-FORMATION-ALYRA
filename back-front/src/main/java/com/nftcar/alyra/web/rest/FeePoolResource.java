package com.nftcar.alyra.web.rest;

import com.nftcar.alyra.repository.FeePoolRepository;
import com.nftcar.alyra.service.FeePoolService;
import com.nftcar.alyra.service.dto.FeePoolDTO;
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
 * REST controller for managing {@link com.nftcar.alyra.domain.FeePool}.
 */
@RestController
@RequestMapping("/api")
public class FeePoolResource {

    private final Logger log = LoggerFactory.getLogger(FeePoolResource.class);

    private static final String ENTITY_NAME = "feePool";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FeePoolService feePoolService;

    private final FeePoolRepository feePoolRepository;

    public FeePoolResource(FeePoolService feePoolService, FeePoolRepository feePoolRepository) {
        this.feePoolService = feePoolService;
        this.feePoolRepository = feePoolRepository;
    }

    /**
     * {@code POST  /fee-pools} : Create a new feePool.
     *
     * @param feePoolDTO the feePoolDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new feePoolDTO, or with status {@code 400 (Bad Request)} if the feePool has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fee-pools")
    public ResponseEntity<FeePoolDTO> createFeePool(@Valid @RequestBody FeePoolDTO feePoolDTO) throws URISyntaxException {
        log.debug("REST request to save FeePool : {}", feePoolDTO);
        if (feePoolDTO.getId() != null) {
            throw new BadRequestAlertException("A new feePool cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FeePoolDTO result = feePoolService.save(feePoolDTO);
        return ResponseEntity
            .created(new URI("/api/fee-pools/" + result.getId()))
            .headers(createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
    public static HttpHeaders createEntityCreationAlert(String applicationName, boolean enableTranslation, String entityName, String param) {
        String message = enableTranslation
            ? applicationName + "." + entityName + ".created"
            : "Un frais  a été créé avec l'identifiant " + param;
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
     * {@code PUT  /fee-pools/:id} : Updates an existing feePool.
     *
     * @param id the id of the feePoolDTO to save.
     * @param feePoolDTO the feePoolDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated feePoolDTO,
     * or with status {@code 400 (Bad Request)} if the feePoolDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the feePoolDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fee-pools/{id}")
    public ResponseEntity<FeePoolDTO> updateFeePool(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody FeePoolDTO feePoolDTO
    ) throws URISyntaxException {
        log.debug("REST request to update FeePool : {}, {}", id, feePoolDTO);
        if (feePoolDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, feePoolDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!feePoolRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        FeePoolDTO result = feePoolService.save(feePoolDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, feePoolDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /fee-pools/:id} : Partial updates given fields of an existing feePool, field will ignore if it is null
     *
     * @param id the id of the feePoolDTO to save.
     * @param feePoolDTO the feePoolDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated feePoolDTO,
     * or with status {@code 400 (Bad Request)} if the feePoolDTO is not valid,
     * or with status {@code 404 (Not Found)} if the feePoolDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the feePoolDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/fee-pools/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<FeePoolDTO> partialUpdateFeePool(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody FeePoolDTO feePoolDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update FeePool partially : {}, {}", id, feePoolDTO);
        if (feePoolDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, feePoolDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!feePoolRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<FeePoolDTO> result = feePoolService.partialUpdate(feePoolDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, feePoolDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /fee-pools} : get all the feePools.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of feePools in body.
     */
    @GetMapping("/fee-pools")
    public List<FeePoolDTO> getAllFeePools() {
        log.debug("REST request to get all FeePools");
        return feePoolService.findAll();
    }

    /**
     * {@code GET  /fee-pools/:id} : get the "id" feePool.
     *
     * @param id the id of the feePoolDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the feePoolDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fee-pools/{id}")
    public ResponseEntity<FeePoolDTO> getFeePool(@PathVariable Long id) {
        log.debug("REST request to get FeePool : {}", id);
        Optional<FeePoolDTO> feePoolDTO = feePoolService.findOne(id);
        return ResponseUtil.wrapOrNotFound(feePoolDTO);
    }

    /**
     * {@code DELETE  /fee-pools/:id} : delete the "id" feePool.
     *
     * @param id the id of the feePoolDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fee-pools/{id}")
    public ResponseEntity<Void> deleteFeePool(@PathVariable Long id) {
        log.debug("REST request to delete FeePool : {}", id);
        feePoolService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
