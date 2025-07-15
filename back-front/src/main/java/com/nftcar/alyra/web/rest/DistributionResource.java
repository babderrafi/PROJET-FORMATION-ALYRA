package com.nftcar.alyra.web.rest;

import com.nftcar.alyra.repository.DistributionRepository;
import com.nftcar.alyra.service.DistributionService;
import com.nftcar.alyra.service.dto.DistributionDTO;
import com.nftcar.alyra.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
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
 * REST controller for managing {@link com.nftcar.alyra.domain.Distribution}.
 */
@RestController
@RequestMapping("/api")
public class DistributionResource {

    private final Logger log = LoggerFactory.getLogger(DistributionResource.class);

    private static final String ENTITY_NAME = "distribution";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DistributionService distributionService;

    private final DistributionRepository distributionRepository;

    public DistributionResource(DistributionService distributionService, DistributionRepository distributionRepository) {
        this.distributionService = distributionService;
        this.distributionRepository = distributionRepository;
    }

    /**
     * {@code POST  /distributions} : Create a new distribution.
     *
     * @param distributionDTO the distributionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new distributionDTO, or with status {@code 400 (Bad Request)} if the distribution has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/distributions")
    public ResponseEntity<DistributionDTO> createDistribution(@Valid @RequestBody DistributionDTO distributionDTO)
        throws URISyntaxException {
        log.debug("REST request to save Distribution : {}", distributionDTO);
        if (distributionDTO.getId() != null) {
            throw new BadRequestAlertException("A new distribution cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DistributionDTO result = distributionService.save(distributionDTO);
        return ResponseEntity
            .created(new URI("/api/distributions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /distributions/:id} : Updates an existing distribution.
     *
     * @param id the id of the distributionDTO to save.
     * @param distributionDTO the distributionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated distributionDTO,
     * or with status {@code 400 (Bad Request)} if the distributionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the distributionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/distributions/{id}")
    public ResponseEntity<DistributionDTO> updateDistribution(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody DistributionDTO distributionDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Distribution : {}, {}", id, distributionDTO);
        if (distributionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, distributionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!distributionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DistributionDTO result = distributionService.save(distributionDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, distributionDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /distributions/:id} : Partial updates given fields of an existing distribution, field will ignore if it is null
     *
     * @param id the id of the distributionDTO to save.
     * @param distributionDTO the distributionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated distributionDTO,
     * or with status {@code 400 (Bad Request)} if the distributionDTO is not valid,
     * or with status {@code 404 (Not Found)} if the distributionDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the distributionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/distributions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<DistributionDTO> partialUpdateDistribution(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody DistributionDTO distributionDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Distribution partially : {}, {}", id, distributionDTO);
        if (distributionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, distributionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!distributionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DistributionDTO> result = distributionService.partialUpdate(distributionDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, distributionDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /distributions} : get all the distributions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of distributions in body.
     */
    @GetMapping("/distributions")
    public ResponseEntity<List<DistributionDTO>> getAllDistributions(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Distributions");
        Page<DistributionDTO> page = distributionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /distributions/:id} : get the "id" distribution.
     *
     * @param id the id of the distributionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the distributionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/distributions/{id}")
    public ResponseEntity<DistributionDTO> getDistribution(@PathVariable Long id) {
        log.debug("REST request to get Distribution : {}", id);
        Optional<DistributionDTO> distributionDTO = distributionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(distributionDTO);
    }

    /**
     * {@code DELETE  /distributions/:id} : delete the "id" distribution.
     *
     * @param id the id of the distributionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/distributions/{id}")
    public ResponseEntity<Void> deleteDistribution(@PathVariable Long id) {
        log.debug("REST request to delete Distribution : {}", id);
        distributionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
